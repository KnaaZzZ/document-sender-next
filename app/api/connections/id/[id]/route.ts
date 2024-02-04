import connectMongoDB from "@/resources/mongodb";
import { Connection } from "@/resources/mongodb/schemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : any) => {
    const { id } = params;
    await connectMongoDB();
    const response = await Connection.findById(id);
    return NextResponse.json(response);
}

export const PUT = async (request : NextRequest, { params } : any) => {
    const { id } = params;
    const { change } = await request.json();
    await connectMongoDB();
    const response = await Connection.findByIdAndUpdate(id, change);
    return NextResponse.json(response);
}

export const DELETE = async (request: NextRequest, { params } : any) => {
    const { id } = params;
    await connectMongoDB();
    const response = await Connection.findByIdAndDelete(id);
    return NextResponse.json(response);
}