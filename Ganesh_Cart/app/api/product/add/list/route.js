import connectDB from '@/config/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        await connectDB()
        
        // Get query parameters for pagination
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit')) || 50 // Default 50 products
        const skip = parseInt(searchParams.get('skip')) || 0
        const search = searchParams.get('search') || ''
        
        // Build query
        let query = {}
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            }
        }
        
        // Fetch products with pagination
        const products = await Product.find(query)
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 }) // Newest first
            .lean() // Convert to plain JS objects for better performance
        
        // Get total count for pagination
        const total = await Product.countDocuments(query)
        
        return NextResponse.json({
            success: true,
            products,
            pagination: {
                total,
                limit,
                skip,
                hasMore: skip + products.length < total
            }
        })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}