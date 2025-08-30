"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

/**
 * Navbar Component
 * Main navigation bar with responsive design, search functionality, cart, and wishlist
 * Features: Brand logo, navigation links, search bar, cart icon with count, user menu with wishlist
 */
const Navbar = () => {

  // Extract required functions and state from AppContext
  const { isSeller, router, user, searchQuery, handleSearch, getCartCount } = useAppContext();
  const {openSignIn}=useClerk()
  // Local state for search input visibility toggle
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <span
        className="cursor-pointer select-none text-2xl md:text-3xl font-bold text-[#212936]"
        onClick={() => router.push('/')}
        style={{ fontFamily: 'inherit', letterSpacing: '0.01em' }}
      >
        <span className="text-[#B71C1C]">Ganesh</span>Cart
      </span>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/aboutus" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/Contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      {/* Desktop Navigation Icons */}
      <ul className="hidden md:flex items-center gap-4 ">
        {/* Search Functionality - Expandable search input for desktop */}
        <div className="relative flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-48"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false)
                }}
              />
              <Image 
                className="w-4 h-4 ml-2 cursor-pointer" 
                src={assets.search_icon} 
                alt="search icon"
                onClick={() => {
                  if (searchQuery) {
                    router.push('/all-products')
                  }
                }}
              />
            </div>
          ) : (
            <Image 
              className="w-4 h-4 cursor-pointer" 
              src={assets.search_icon} 
              alt="search icon"
              onClick={() => setIsSearchOpen(true)}
            />
          )}
        </div>
        
        {/* Cart Icon for Desktop - Shows item count badge when items present */}
        {user && (
          <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <Image className="w-5 h-5" src={assets.cart_icon} alt="cart icon" />
            {/* Cart item count badge - only visible when cart has items */}
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>
        )}
        
        { user
         ? <> <UserButton>
              {/* Wishlist navigation - Desktop user menu */}
              <UserButton.MenuItems>
                <UserButton.Action label="Wishlist" labelIcon={<Image src={assets.heart_icon} alt="wishlist" className="w-4 h-4" />} onClick={()=>router.push('/wishlist')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')}/>
              </UserButton.MenuItems>
           </UserButton>
         </> 
         : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </ul>

      {/* Mobile Navigation Section */}
      <div className="flex items-center md:hidden gap-3">
        {/* Mobile Search Functionality - Compact search input for mobile screens */}
        <div className="relative flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-36"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false)
                }}
              />
              <Image 
                className="w-4 h-4 ml-2 cursor-pointer" 
                src={assets.search_icon} 
                alt="search icon"
                onClick={() => {
                  if (searchQuery) {
                    router.push('/all-products')
                  }
                }}
              />
            </div>
          ) : (
            <Image 
              className="w-4 h-4 cursor-pointer" 
              src={assets.search_icon} 
              alt="search icon"
              onClick={() => setIsSearchOpen(true)}
            />
          )}
        </div>
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        { user
         ? <> <UserButton>
          <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=>router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={()=>router.push('/all-products')}/>
              </UserButton.MenuItems>
              {/* Wishlist navigation - Mobile user menu */}
              <UserButton.MenuItems>
                <UserButton.Action label="Wishlist" labelIcon={<Image src={assets.heart_icon} alt="wishlist" className="w-4 h-4" />} onClick={()=>router.push('/wishlist')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')}/>
              </UserButton.MenuItems>
           </UserButton>
         </> 
         : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;