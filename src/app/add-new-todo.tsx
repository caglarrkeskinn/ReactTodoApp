"use client";
import { useRouter } from "next/navigation"; // Updated the import path
import { useState, ChangeEvent, FC } from "react";

async function addTodo(name: string, refresh: () => void): Promise<void> {
  await fetch(`http://localhost:8000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: name }),
  });

  refresh();
}

const AddNewTodo: FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddTodo = async () => {
    await addTodo(name, router.refresh);
    setName("");
  };

  return (
    <div>
      <input type="text" onChange={handleChange} value={name} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddNewTodo;
