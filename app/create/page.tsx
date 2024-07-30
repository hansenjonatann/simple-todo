"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TodoCreatePage = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      {
        if (res) {
          setCategories(res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = async () => {
    const response = await axios.post("/api/todo", {
      title,
      categoryId,
      description,
    });
    if (response) {
      toast.success("Todo Created");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="flex items-center h-screen justify-center">
        <div className="flex flex-col">
          <h1 className="text-center font-bold text-xl">Todo Create Form</h1>
          <form onSubmit={handleAddTodo}>
            <div className="flex mt-4 flex-col space-y-3">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your title of todo"
                className="text-black text-sm placeholder:text-black px-2 py-2 rounded-lg"
              />
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                className=" text-blue-800 font-bold py-2 px-2 rounded-md"
              >
                <option value="">Choose your todo`s category</option>
                {categories?.map((category: any, index: number) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <textarea
                id="id"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your todo description"
                className="px-4 py-2 rounded-md h-24 text-black placeholder:text-black"
              />
              <button
                type="submit"
                className="py-2 rounded-md bg-gradient-to-r from-blue-600 to-red-600"
              >
                Create Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoCreatePage;
