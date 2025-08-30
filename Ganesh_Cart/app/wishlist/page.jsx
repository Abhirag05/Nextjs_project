'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';

/**
 * Wishlist Page Component
 * Displays user's saved products with authentication check
 * Features: Login requirement, empty state handling, product grid display
 */
const Wishlist = () => {
    const { products, wishlistItems, user } = useAppContext();

    // Filter products that are in user's wishlist for display
    const wishlistProducts = products.filter(product => 
        wishlistItems.includes(product._id)
    );

    // Authentication check - redirect to login if user not authenticated
    if (!user) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 md:px-16 lg:px-32">
                    <div className="text-center">
                        <h1 className="text-2xl font-medium mb-4">Please Login</h1>
                        <p className="text-gray-600">You need to be logged in to view your wishlist.</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">My Wishlist</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>
                
                {wishlistProducts.length > 0 ? (
                    <>
                        <div className="mt-4 text-gray-600">
                            {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} in your wishlist
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                            {wishlistProducts.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full py-20">
                        <div className="text-center">
                            <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
                            <p className="text-gray-600 mb-6">Start adding products you love to your wishlist!</p>
                            <button 
                                onClick={() => window.location.href = '/all-products'}
                                className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
                            >
                                Browse Products
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Wishlist;
