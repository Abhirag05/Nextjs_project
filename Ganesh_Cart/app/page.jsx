import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Server Component - SSR for better performance
async function fetchInitialProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/product/add/list?limit=20`, {
      cache: 'no-store', // Always get fresh data, change to 'force-cache' with revalidate for production
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) return { products: [] };
    
    const data = await res.json();
    return data.success ? { products: data.products } : { products: [] };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [] };
  }
}

const Home = async () => {
  const { products } = await fetchInitialProducts();
  
  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-16 lg:px-32 pt-20">
        <HeaderSlider />
        <HomeProducts initialProducts={products} />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
