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

    let result;
    let succuess = false
    if (palyload.login) {
        result = await restaurantSchema.findOne({ email: palyload.email, password: palyload.password })
        if(result) {
            succuess = true
        }
    } else {
        let restaurant = new restaurantSchema(palyload)
        result = await restaurant.save()
        if (result) {
            succuess = true
        }
    }

    return NextResponse.json({ result, succuess })
}