import connectMongoDB from "@/lib/services/mongodb/connection";
import Connection from "@/lib/services/mongodb/models/ConnectionModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : any) => {
    const { id } = params;
    await connectMongoDB();
    const connection = await Connection.findOne({_id : id});
    return NextResponse.json({connection})
}

export const PUT = async (request : NextRequest, { params } : any) => {
    const { id } = params;
    const { connection } = await request.json();
    await connectMongoDB();
    await Connection.findByIdAndUpdate(id, connection);
    return NextResponse.json({message: 'Connection updated.'}, {status: 201})
}