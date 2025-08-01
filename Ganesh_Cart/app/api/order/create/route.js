import { inngest } from "@/config/inngest"
import Product from "@/models/Product"
import { getAuth, User } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"





export async function POST(request){
    try{
        const {userId }=getAuth(request)
        const {address,items}=await request.json()

       if(!address || items.length===0){
        return NextResponse.json({success:false,message:"Invalid data"})
       }
       //calculate total amount
       const amount=await items.reduce(async(acc,item)=>{
        const product=await Product.findById(item.productId);
        return acc+product.offerPrice*item.quantity;
       },0)
       await inngest.send({
        name:'order/created',
        data:{
            userId,
            address,
            items,
            amount:amount + Math.floor(amount*0.02),
            date:Date.now()
        }
       })
       //clear user cart
       const user = await User.findOne({ clerkId: userId });
       user.cartItems={}
       await user.save()

       return NextResponse.json({success:true,message:"Order placed successfully"})
    }catch(error){
        return NextResponse.json({success:false,message:error.message})
    }
}