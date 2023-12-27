import connectMongoDB from "@/lib/services/mongodb/connection"
import User from "@/lib/services/mongodb/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : any) => {
    const { email } = params;
    await connectMongoDB();
    const user = await User.findOne({email : email});
    return NextResponse.json({user});
}