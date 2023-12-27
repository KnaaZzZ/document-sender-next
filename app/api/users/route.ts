import connectMongoDB from "@/lib/services/mongodb/connection"
import User from "@/lib/services/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({users})
}

export const POST = async (request : NextRequest) => {
    const { user } = await request.json();
    console.log(user);
    await connectMongoDB();
    await User.create(user);
    return NextResponse.json({message: 'User created.'}, {status: 201})
}