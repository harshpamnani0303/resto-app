import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload = await request.json();
    let success = false ; 
    await mongoose.connect(process.env.MONGODB_URI)
    const user = new userSchema(payload);
    const result = await user.save();
    if(result){
        success=true;
    }
    return NextResponse.json({result , success})
}