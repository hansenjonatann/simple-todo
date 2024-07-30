"use client";

import TodoCard from "@/components/TodoCard";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/todo");
      if (res) {
        setIsLoading(false);
        setTodos(res.data.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="flex bg-gradient-to-br p-4 from-blue-500 to-blue-800 justify-center items-center ">
        <div className="flex-col">
          <h1 className="font-bold  text-3xl">Todo List</h1>
          <div className="flex-col mt-6">
            <div className="grid grid-cols-2 gap-2 ">
              {isLoading ? (
                <>
                  {todos.map((todo: any, index: number) => (
                    <>
                      <div className="bg-gray-300 aspect-square"></div>
                    </>
                  ))}
                </>
              ) : (
                <TodoCard api={todos} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4  right-3">
        <div className="w-12 text-black transition-all duration-300 ease-in-out hover:bg-opacity-50  hover:bg-blue-600 hover:text-white  flex animate-bounce items-center justify-center h-12 bg-white rounded-full">
          <Link href="/create">
            <Plus size={30} />
          </Link>
        </div>
      </div>
    </>
  );
}
