import connectMongoDB from "@/resources/mongodb";
import { User } from "@/resources/mongodb/schemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : any) => {
    try {
        const { id } = params;
        await connectMongoDB();
        const response = await User.findById(id);
        return NextResponse.json(response);
    } catch (e) {
        return NextResponse.json(null);
    }
}

export const PUT = async (request : NextRequest, { params } : any) => {
    const { id } = params;
    const { change } = await request.json();
    await connectMongoDB();
    const response = await User.findByIdAndUpdate(id, change);
    return NextResponse.json(response);
}

export const DELETE = async (request: NextRequest, { params } : any) => {
    const { id } = params;
    await connectMongoDB();
    const response = await User.findByIdAndDelete(id);
    return NextResponse.json(response);
}