"use client"
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Premium Accessories for Your Drive",
      offer: "Special: 30% Off on Premium Accessories",
      buttonText1: "Shop Accessories",
      buttonText2: "See All Accessories",
      imgSrc: assets.spare_image_1,
    },
    {
      id: 2,
      title: "Upgrade Your Ride with Genuine Car Tools",
      offer: "Limited Stock: Grab Flat 20% Off",
      buttonText1: "Shop Tools",
      buttonText2: "Browse Car Spare Parts",
      imgSrc: assets.spare_image_2,
    },
    {
      id: 3,
      title: "High-Quality Spare Parts for Bikes",
      offer: "Exclusive Deal: Free Shipping on All Tools",
      buttonText1: "Shop Spares",
      buttonText2: "See All Spares",
      imgSrc: assets.spare_image_3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <Link href="/all-products">
                  <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                    {slide.buttonText1}
                  </button>
                </Link>
                <Link href="/all-products">
                  <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                    {slide.buttonText2}
                    <Image 
                      className="group-hover:translate-x-1 transition" 
                      src={assets.arrow_icon} 
                      alt="arrow_icon"
                      width={16}
                      height={16}
                    />
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={288}
                height={288}
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="(max-width: 768px) 192px, 288px"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
