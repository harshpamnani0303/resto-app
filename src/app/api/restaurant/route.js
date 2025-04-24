import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
    await mongoose.connect(process.env.MONGODB_URI)
    const data = await restaurantSchema.find({})
    console.log(data);
    
    return NextResponse.json({ result: data })
}

export async function POST(request) {
    let palyload = await request.json()
    await mongoose.connect(process.env.MONGODB_URI)
    let restaurant = new restaurantSchema(palyload)
    const result = await restaurant.save()
    return NextResponse.json({ result,succuess: true })
}