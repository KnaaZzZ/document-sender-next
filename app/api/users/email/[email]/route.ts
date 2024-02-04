import connectMongoDB from "@/resources/mongodb";
import { User } from "@/resources/mongodb/schemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : any) => {
    try {
        const { email } = params;
        await connectMongoDB();
        const response = await User.findOne({email: email});
        return NextResponse.json(response);
    } catch (e) {   
        return NextResponse.json(null);
    }
}