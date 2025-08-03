import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { userId } = getAuth(request);
    const isSeller = authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: 'not authorized' });
    }
    const { id } = params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: 'Product not found' });
    }
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}