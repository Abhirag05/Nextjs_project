import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    try{
        await connectDB()
        const {userId} = getAuth(request)
      
        const user = await User.findOne({ clerkId: userId }) || await User.findById(userId);
        if(!user){
            return NextResponse.json({success:false,message :"User Not Found"})
        }
        return NextResponse.json({
            success:true,
            user
        })
    }catch(error){
         return NextResponse.json({success:false,message :error.message})
    }
}