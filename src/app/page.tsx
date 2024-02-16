import { TodoForm } from "@/components/TodoForm";
import { Todos } from "@/components/Todos";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-xl w-full">
      <TodoForm />
      <Todos />
    </div>
  );
}
