import mongoose from "mongoose";

/**
 * User Schema Definition
 * Stores user information including cart and wishlist data
 */
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    clerkId: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    // Cart items stored as object with productId as key and quantity as value
    cartItems: { type: Object, default: {} },
    // Wishlist items stored as array of product IDs for easy lookup and persistence
    wishlistItems: { type: Array, default: [] }
}, { minimize: false });

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;