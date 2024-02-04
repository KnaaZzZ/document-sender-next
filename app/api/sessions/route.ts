import connectMongoDB from "@/resources/mongodb";
import { Session } from "@/resources/mongodb/schemas";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { session } = await request.json();
    await connectMongoDB();
    const response = await Session.create(session)
    return NextResponse.json(response);
}