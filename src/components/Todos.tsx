import { getTodos } from "@/actions/getTodos";
import { DeleteTodo } from "./DeleteTodo";
import { UpdateStatusTodo } from "./UpdateStatusTodo";

export const Todos = async () => {
  const { todos } = await getTodos();

  return (
    <ul className="space-y-2 w-full max-w-96">
      {todos &&
        todos.map((todo) => (
          <li
            key={todo.id}
            className="border-b border-slate-400 flex flex-col p-1"
          >
            <div className="gap-2 flex break-words w-full">
              <UpdateStatusTodo
                id={todo.id}
                checked={todo.status === "COMPLETED"}
              />
              <p className="break-words w-full">
                {todo.status === "COMPLETED" ? (
                  <s>{todo.content}</s>
                ) : (
                  todo.content
                )}
              </p>
            </div>
            <DeleteTodo id={todo.id} />
          </li>
        ))}
    </ul>
  );
};
