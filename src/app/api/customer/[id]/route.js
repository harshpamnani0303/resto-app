import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Get the [id] from the path

    await mongoose.connect(process.env.MONGODB_URI);

    const details = await restaurantSchema.findOne({ _id: id });
    const foodItems = await foodSchema.find({ resto_id: id });

    return NextResponse.json({ success: true, details, foodItems });
}
