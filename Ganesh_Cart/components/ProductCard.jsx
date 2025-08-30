import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

/**
 * ProductCard Component
 * Displays individual product information with interactive wishlist and buy functionality
 * Features: Product image, details, ratings, wishlist toggle, and buy now button
 */
const ProductCard = ({ product }) => {

    // Extract required functions and state from AppContext
    const { currency, router, buyNow, toggleWishlist, isInWishlist } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                {/* Wishlist Toggle Button - Interactive heart icon with visual feedback */}
                <button 
                    onClick={(e) => {
                        // Prevent card click event from triggering when heart is clicked
                        e.stopPropagation();
                        // Toggle wishlist status with database persistence
                        toggleWishlist(product._id);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
                        isInWishlist(product._id) 
                            ? 'bg-red-500 text-white' // Red background when in wishlist
                            : 'bg-white text-gray-600 hover:bg-gray-50' // White background when not in wishlist
                    }`}
                >
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="wishlist toggle"
                        style={{
                            // Invert colors when item is in wishlist for better contrast
                            filter: isInWishlist(product._id) 
                                ? 'brightness(0) invert(1)' 
                                : 'none'
                        }}
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        buyNow(product._id);
                    }}
                    className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
                >
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard