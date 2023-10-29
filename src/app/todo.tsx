"use client";
import { FC, ChangeEvent } from "react";
import { useRouter } from "next/navigation"; // Fixed the import path

// Define the shape of a Todo item
export interface ITodo {
  id: number;
  task: string;
  isDone: boolean;
  // Add other properties as needed
}

interface TodoProps {
  todo: ITodo;
}

async function update(
  id: number,
  isDone: boolean,
  refresh: () => void
): Promise<void> {
  await fetch(`http://localhost:8000/todos/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, isDone }),
  });

  refresh();
}

async function deleteTodo(id: number, refresh: () => void): Promise<void> {
  await fetch(`http://localhost:8000/todos/${id}`, {
    method: "DELETE",
  });

  refresh();
}

export const Todo: FC<TodoProps> = ({ todo }) => {
  const router = useRouter();

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    update(todo.id, e.target.checked, router.refresh);
    router.refresh();
  };

  const handleDelete = () => {
    deleteTodo(todo.id, router.refresh);
    router.refresh();
  };

  return (
    <>
      <input type="checkbox" onChange={handleUpdate} checked={todo.isDone} />
      <span>{todo.task}</span>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default Todo;
