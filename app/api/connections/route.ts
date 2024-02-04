import connectMongoDB from "@/resources/mongodb";
import { Connection } from "@/resources/mongodb/schemas";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { connection } = await request.json();
    await connectMongoDB();
    const response = await Connection.create(connection)
    return NextResponse.json(response);
}