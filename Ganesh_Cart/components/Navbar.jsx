"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

// Icon components for mobile menu
const AboutIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-13v4m0 4h.01" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
  </svg>
);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 shadow-sm">
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
      <div className="flex items-center md:hidden gap-2">
        {/* Mobile Search Functionality - Responsive search input for mobile screens */}
        <div className="relative flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-32"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) setIsSearchOpen(false)
                }}
              />
              <Image 
                className="w-4 h-4 ml-2 cursor-pointer flex-shrink-0" 
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
              className="w-5 h-5 cursor-pointer" 
              src={assets.search_icon} 
              alt="search icon"
              onClick={() => setIsSearchOpen(true)}
            />
          )}
        </div>
        {!isSearchOpen && isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-2 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">Seller</button>}
        {!isSearchOpen && ( user
         ? <> <UserButton>
          <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=>router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={()=>router.push('/all-products')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="About Us" labelIcon={<AboutIcon/>} onClick={()=>router.push('/aboutus')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Contact" labelIcon={<ContactIcon/>} onClick={()=>router.push('/Contact')}/>
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
        </button>)}
      </div>
    </nav>
  );
};

export default Navbar;