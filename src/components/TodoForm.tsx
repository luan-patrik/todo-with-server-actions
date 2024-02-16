import { addTodo } from "@/actions/addTodo";
import { Button } from "./ui/Button";

export const TodoForm = async () => {
  return (
    <form action={addTodo} className="w-full flex flex-col gap-4">
      <input
        type="text"
        name="content"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="What needs to be done?"
        autoFocus
        required
      />
      <Button
        className="hover:bg-slate-950 transition border-slate-950 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md border outline-none focus-visible:bg-slate-950"
        isPending="Adicionando..."
      >
        Adicionar
      </Button>
    </form>
  );
};
