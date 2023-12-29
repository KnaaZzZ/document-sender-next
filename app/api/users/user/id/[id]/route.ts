import connectMongoDB from "@/lib/services/mongodb/connection"
import User from "@/lib/services/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : any) => {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({_id : id});
    return NextResponse.json({user})
}

export const PUT = async (request : NextRequest, { params } : any) => {
    const { id } = params;
    const { user } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, user);
    return NextResponse.json({message: 'User updated.'}, {status: 201})
}