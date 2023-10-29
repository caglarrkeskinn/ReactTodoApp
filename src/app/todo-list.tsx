"use client";
import { FC, useEffect, useState } from "react";
import { Todo, ITodo } from "./todo";

const getTodos = async (): Promise<ITodo[]> => {
  const response = await fetch("http://localhost:8000/todos");
  return response.json();
};

const TodoList: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    })();
  }, []);

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((t: ITodo) => {
          return (
            <li key={t.id} style={{ padding: "5px 0" }}>
              <Todo todo={t} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
