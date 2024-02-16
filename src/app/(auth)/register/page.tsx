import { RegisterForm } from "@/components/RegisterForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await auth();
  if (session) redirect("/");

  return <RegisterForm />;
}
