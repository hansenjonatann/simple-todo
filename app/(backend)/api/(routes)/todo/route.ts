"use server";

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Todo } from "@prisma/client";
const db = new PrismaClient();

export const GET = async () => {
  try {
    const todos = await db.todo.findMany({
      include: {
        category: true,
      },
    });
    if (todos) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "List of Todo",
        data: todos,
      });
    }

    if (!todos) {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Failed to fetch data",
        data: null,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Interna; Server Error",
      error: error,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body: Todo = await req.json();
    const todo = await db.todo.create({
      data: {
        title: body.title,
        categoryId: body.categoryId,
        description: body.description,
      },
    });

    if (todo) {
      return NextResponse.json({
        status: true,
        statusCode: 201,
        message: "Todo created!",
        data: todo,
      });
    }

    if (!todo) {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Something went wrong",
        data: null,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
