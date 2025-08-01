import connectDB from "@/config/db"
import { inngest } from "@/config/inngest"
import Order from "@/models/Orders"
import Product from "@/models/Product"
import User from "@/models/User"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(request){
    try{
        await connectDB();
        const {userId }=getAuth(request)
        const {address,items}=await request.json()

       if(!address || items.length===0){
        return NextResponse.json({success:false,message:"Invalid data"})
       }
       //calculate total amount
       const amount=await items.reduce(async(acc,item)=>{
        const product=await Product.findById(item.product);
        return  await acc+product.price*item.quantity;
       },0)
       // ✅ Save order to MongoDB
       await Order.create({
       userId,
        items,
        amount:amount + Math.floor(amount*0.02),
        address,
        date: Date.now(),
      });
       await inngest.send({
        name:'order/created',
        data:{
            userId,
            items,
            amount:amount + Math.floor(amount*0.02),
            address,
            date:Date.now()
        }
       })
       //clear user cart
       const user = await User.findById(userId);
       user.cartItems={}
       await user.save()

       return NextResponse.json({success:true,message:"Order placed successfully"})
    }catch(error){
        return NextResponse.json({success:false,message:error.message})
    }
}