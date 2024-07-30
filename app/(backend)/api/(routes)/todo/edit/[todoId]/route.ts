'use server'

import {NextResponse , NextRequest} from 'next/server'

import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

export const PATCH = async (req: NextRequest , {params} : {params: {todoId: string}}) => {
    try{
        const id = params.todoId
        const body = await req.json()
        if(id)
        {
            const todo = await db.todo.update({
                where: {
                    id: id 
                },  
                data: {
                    title: body.title , 
                    description: body.description,
                    
                }
            })

            if(todo)
            {
                return NextResponse.json({
                    status: true , 
                    statusCode: 202 , 
                    message: 'Update Todo Success' , 
                    data: todo
                })
            }
        }

        if(!id)
        {
          return NextResponse.json({
            status: false , 
            statusCode: 400 , 
            message: 'Something went wrong ',
          })  
        }
    } catch(error)
    {
        return NextResponse.json({
            status: false , 
            statusCode: 500 , 
            message: 'Internal Server Error',
            error: error
        })
    }
}