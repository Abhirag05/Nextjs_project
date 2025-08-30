import connectDB from '@/config/db'
import User from '@/models/User'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * Wishlist Get API Endpoint
 * Retrieves user's wishlist items from database
 * Used for syncing wishlist state on app initialization
 */
export async function GET(request) {
    try {
        // Extract user ID from Clerk authentication
        const { userId } = getAuth(request)

        // Connect to MongoDB database
        await connectDB()
        const user = await User.findOne({ clerkId: userId });
        
        // Validate user exists
        if (!user) {
            return NextResponse.json({success: false, message: "User Not Found"})
        }

        // Return user's wishlist items (empty array if none exist)
        return NextResponse.json({
            success: true, 
            wishlistItems: user.wishlistItems || []
        })

    } catch(error) {
       return NextResponse.json({success: false, message: error.message})
    }
}
