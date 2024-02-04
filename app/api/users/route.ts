import connectMongoDB from "@/resources/mongodb";
import { User } from "@/resources/mongodb/schemas";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { user } = await request.json();
    await connectMongoDB();
    const response = await User.create(user);
    return NextResponse.json(response);
}