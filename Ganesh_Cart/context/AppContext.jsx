'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const {user}=useUser()
    const {getToken} =useAuth()

    // Core application state
    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    
    // Shopping cart state - stores productId:quantity pairs
    const [cartItems, setCartItems] = useState({})
    
    // Wishlist state - stores array of product IDs for persistence
    const [wishlistItems, setWishlistItems] = useState([])
    
    // Search functionality state
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    const fetchProductData = async () => {
        try{
            const {data} = await axios.get('/api/product/add/list')

            if(data.success){
                setProducts(data.products)
                setFilteredProducts(data.products)
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)
        }
    }

    const fetchUserData = async () => {
        try{

             if(user.publicMetadata.role==='seller'){
                     setIsSeller(true);
                 }

        const token = await getToken();

        const {data} = await axios.get('/api/inngest/user/data',{ headers :{Authorization : `Bearer ${token}`},
        withCredentials: true })

        if(data.success){
            setUserData(data.user)
            setCartItems(data.user.cartItems)
            // Initialize wishlist from user data or empty array if none exists
            setWishlistItems(data.user.wishlistItems || [])
        }else{
            toast.error(data.message)
        }

        }catch(error){
            toast.error(error.message)  
        }

       
    }

    const addToCart = async (itemId) => {
        // Check if user is logged in
        if (!user) {
            toast.error("Please login to add items to cart");
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        
        try{
            const token = await getToken()

            await axios.post('/api/cart/update',{cartData},{ headers :{Authorization : `Bearer ${token}`},
             })
          toast.success("Item added to cart")
        }catch(error){
            toast.error(error.message)
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity <=0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        if(user){
            try{
                const token = await getToken()

                await axios.post('/api/cart/update',{cartData},{ headers :{Authorization : `Bearer ${token}`},
                 })
              toast.success("Cart Updated")
            }catch(error){
                toast.error(error.message)
            }
           
        }

    }

    const buyNow = async (itemId) => {
        // Check if user is logged in
        if (!user) {
            toast.error("Please login to proceed with purchase");
            return;
        }
        
        // Add to cart and redirect to cart page
        await addToCart(itemId);
        router.push('/cart');
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }

    /**
     * Toggle Wishlist Function
     * Adds or removes a product from user's wishlist with database persistence
     * @param {string} productId - The ID of the product to toggle
     */
    const toggleWishlist = async (productId) => {
        // Require user authentication for wishlist operations
        if (!user) {
            toast.error("Please login to add items to wishlist");
            return;
        }

        try {
            const token = await getToken();
            // Determine action based on current wishlist state
            const isInWishlist = wishlistItems.includes(productId);
            const action = isInWishlist ? 'remove' : 'add';

            // Make API call to update wishlist in database
            const { data } = await axios.post('/api/wishlist/update', 
                { productId, action },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                // Update local state with server response
                setWishlistItems(data.wishlistItems);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Check if Product is in Wishlist
     * Helper function to determine wishlist status for UI rendering
     * @param {string} productId - The ID of the product to check
     * @returns {boolean} - True if product is in wishlist
     */
    const isInWishlist = (productId) => {
        return wishlistItems.includes(productId);
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if(user){
            fetchUserData()
        }
        
    }, [user])

    // Context value object - all functions and state available to components
    const value = {
        // User authentication and data
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        
        // Product management
        products, fetchProductData,
        
        // Shopping cart functionality
        cartItems, setCartItems,
        addToCart, updateCartQuantity, buyNow,
        getCartCount, getCartAmount,
        
        // Search functionality
        searchQuery, setSearchQuery,
        filteredProducts, handleSearch,
        
        // Wishlist functionality with database persistence
        wishlistItems, toggleWishlist, isInWishlist
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}