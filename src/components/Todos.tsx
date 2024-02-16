import { getTodos } from "@/actions/getTodos";
import { DeleteTodo } from "./DeleteTodo";
import { UpdateStatusTodo } from "./UpdateStatusTodo";

export const Todos = async () => {
  const { todos } = await getTodos();

  return (
    <ul className="flex flex-col w-full gap-y-4">
      {todos &&
        todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center"
          >
            <li className="w-full flex break-all">
              {todo.status === "COMPLETED" ? (
                <s>{todo.content}</s>
              ) : (
                todo.content
              )}
            </li>
            <div className="flex items-center gap-2">
              <UpdateStatusTodo id={todo.id} value={todo.status} />
              <DeleteTodo id={todo.id} />
            </div>
          </div>
        ))}
    </ul>
  );
};
