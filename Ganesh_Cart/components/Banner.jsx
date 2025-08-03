import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
      <Image
        className="max-w-56"
        src={assets.banner1}
        alt="jbl_soundbox_image"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
          Find Genuine Spare Parts Easily
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          Your trusted source for quality automotive and electronic spare parts
        </p>
        <Link href="/all-products" >
          <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">
            Shop Spare Parts
            <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
          </button>
        </Link>
      </div>
      <Image
        className="hidden md:block max-w-80"
        src={assets.banner2}
        alt="md_controller_image"
      />
    </div>
  );
};

export default Banner;