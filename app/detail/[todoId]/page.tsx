"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const TodoDetailPage = ({ params }: { params: { todoId: string } }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const fetchDetailTodo = async () => {
    const res = await axios.get(`/api/todo/${params.todoId}`);

    if (res) {
      setTitle(res.data.data.title);
      setDescription(res.data.data.description);
      setCategory(res.data.data.category.name);
    }
  };
  useEffect(() => {
    fetchDetailTodo();
  });
  return (
    <>
      <div className="bg-gradient-to-br from-blue-600 h-screen  to-blue-800">
        <div className="p-4">
          <div className="flex justify-between mt-4">
            <h1 className="font-bold text-2xl">{title}</h1>
            <div className="bg-blue-600 text-white py-2 px-2 rounded-md">
              {category}
            </div>
          </div>
          <p className="text-md mt-4 text-ellipsis ">{description}</p>

          <div className="mt-4 w-full flex transition-all duration-300 ease-in-out bg-blue-600 py-2 rounded-md hover:bg-blue-800 justify-center items-center">
            <Link href="/">Back To Todos</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoDetailPage;
