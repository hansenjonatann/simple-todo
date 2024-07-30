"use client";

import { Edit, View } from "lucide-react";
import Link from "next/link";

interface TodoCardProps {
  api: any;
}
const TodoCard = ({ api }: TodoCardProps) => {
  return (
    <>
      {api.map((item: any, index: number) => (
        <div
          key={index}
          className=" bg-white hover:bg-opacity-70 transition-all ease-in-out duration-300 aspect-square  rounded-md text-black shadow-xl  "
        >
          <div className="flex m-2 flex-col ">
            <h1 className="font-bold">{item.title}</h1>
            <small className="truncate">{item.description}</small>
            <div className="mt-2">
              <div className="px-2 w-20 bg-blue-800 text-white text-center  rounded-md">
                {item.category.name}
              </div>
            </div>
            <div className="flex mt-4 justify-end space-x-2">
              <Edit />
              <Link href={`/detail/${item.id}`}>
                <View className="text-blue-800" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoCard;
