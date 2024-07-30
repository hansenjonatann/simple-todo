import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async () => {
  try {
    const categories = await db.category.findMany();

    if (categories) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "List of Category",
        data: categories,
      });
    }

    if (!categories) {
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
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const category = await db.category.create({
    data: {
      name: body.name,
      slug: body.slug,
    },
  });

  if (category) {
    return NextResponse.json({
      status: true,
      statusCode: 201,
      message: "Category created",
      data: category,
    });
  }

  if (!category) {
    return NextResponse.json({
      status: false,
      statusCode: 400,
      message: "Something went wrong",
    });
  }
};
