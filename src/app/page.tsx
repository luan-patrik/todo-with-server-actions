import { TodoForm } from "@/components/TodoForm";
import { Todos } from "@/components/Todos";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="flex flex-col justify-center items-center min-h-svh py-4 px-2 mx-auto w-full max-w-96 gap-4">
      <TodoForm />
      <Todos />
    </div>
  );
}
