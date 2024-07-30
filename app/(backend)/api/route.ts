'use server'

import {NextResponse , NextRequest} from 'next/server'


export const GET = () => {
    return NextResponse.json({status: true , statusCode: 200 , message: 'Server is running'})
} 