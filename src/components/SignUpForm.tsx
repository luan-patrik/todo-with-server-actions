import { registerUser } from "@/actions/register";
import { Button } from "./ui/Button";

export const RegisterForm = () => {
  return (
    <form
      action={registerUser}
      className="w-full flex flex-col mx-auto justify-center gap-4 max-w-96"
    >
      <input
        type="email"
        name="email"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="What needs to be done?"
        autoComplete="email"
        autoFocus
        required
      />
      <input
        type="password"
        name="password"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="What needs to be done?"
        autoComplete="current-password"
        autoFocus
        required
      />
      <Button
        className="hover:bg-slate-950 transition border-slate-950 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md border outline-none focus-visible:bg-slate-950"
        isPending="Cadastrando..."
      >
        Cadastrar
      </Button>
    </form>
  );
};
