import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const products = [
  {
    id: 1,
    image: assets.feature1,
    title: "Durable Car Tyres",
    description: "Experience unmatched grip and safety with our premium quality tyres.",
  },
  {
    id: 2,
    image: assets.feature2,
    title: "Protective Bike Helmets",
    description: "Ride safe and stylish with our certified helmets.",
    
  },
  {
    id: 3,
    image: assets.feature3,
    title: "Advanced Brake Pads",
    description: "Upgrade your vehicle’s stopping power with our high-performance brake pads.",
  },
];

const FeaturedProduct = () => {
  const { user, router } = useAppContext();

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to proceed with purchase");
      return;
    }
    // For featured products, redirect to products page or specific product
    router.push('/products');
  };

  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <button onClick={handleBuyNow} className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
