import { getTodos } from "@/actions/getTodos";
import { TodoForm } from "@/components/TodoForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const { todos } = await getTodos();

  if (!session) redirect("/login");

  if (!todos) return;

  return <TodoForm todos={todos} session={session} />;
}
