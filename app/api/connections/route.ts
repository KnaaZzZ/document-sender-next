import connectMongoDB from "@/lib/services/mongodb/connection";
import Connection from "@/lib/services/mongodb/models/ConnectionModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request : NextRequest) => {
    const { connection } = await request.json();
    await connectMongoDB();
    await Connection.create(connection);
    return NextResponse.json({message: 'Connection created.'}, {status: 201})
}