'use server'

import {NextResponse , NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient()

export const GET = async (req: NextRequest , {params} : {params: {todoId: string}}) => {
    try {
        const id = params.todoId
        const todo = await db.todo.findUnique({
            where:{
                id: id
            },

            include: {
                category: true
            }
        })

        if(todo)
        {
            return NextResponse.json(
                {
                    status: true, 
                     statusCode: 200 , 
                     message: 'Todo Detail',
                     data: todo
                }
            )
        }

        if(!todo)
        {
            return NextResponse.json({
                status: false , 
                statusCode: 404,
                message: 'Todo not found',
                
            })
        }
    } catch (error) {
       return NextResponse.json({
        status: false , 
        statusCode: 500,
        message: 'Internal Server Error',
        error: error
       }) 
    }
}
