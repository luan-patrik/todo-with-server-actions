import { AuthForm } from "@/components/AuthForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) redirect("/");

  return <AuthForm />;
}
