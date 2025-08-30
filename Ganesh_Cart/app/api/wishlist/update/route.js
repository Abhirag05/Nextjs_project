import connectDB from '@/config/db'
import User from '@/models/User'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * Wishlist Update API Endpoint
 * Handles adding and removing products from user's wishlist
 * Requires authentication and stores data persistently in MongoDB
 */
export async function POST(request) {
    try {
        // Extract user ID from Clerk authentication
        const { userId } = getAuth(request)
        const { productId, action } = await request.json()

        // Connect to MongoDB database
        await connectDB()
        const user = await User.findOne({ clerkId: userId });
        
        // Validate user exists
        if (!user) {
            return NextResponse.json({success: false, message: "User Not Found"})
        }
        
        // Get current wishlist items or initialize empty array
        let wishlistItems = user.wishlistItems || []
        
        // Handle add/remove actions
        if (action === 'add') {
            // Only add if product not already in wishlist (prevent duplicates)
            if (!wishlistItems.includes(productId)) {
                wishlistItems.push(productId)
            }
        } else if (action === 'remove') {
            // Remove product from wishlist array
            wishlistItems = wishlistItems.filter(id => id !== productId)
        }
        
        // Update user document and save to database
        user.wishlistItems = wishlistItems
        await user.save()

        // Return success response with updated wishlist
        return NextResponse.json({
            success: true, 
            wishlistItems: user.wishlistItems,
            message: action === 'add' ? 'Added to wishlist' : 'Removed from wishlist'
        })

    } catch(error) {
       return NextResponse.json({success: false, message: error.message})
    }
}
