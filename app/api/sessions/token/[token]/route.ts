import connectMongoDB from "@/resources/mongodb";
import { Session } from "@/resources/mongodb/schemas";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request : NextRequest, { params } : any) => {
    try {
        const { token } = params;
        await connectMongoDB();
        const response = await Session.findOne({token: token});
        return NextResponse.json(response);
    } catch (e) {
        return NextResponse.json(null);
    }
}