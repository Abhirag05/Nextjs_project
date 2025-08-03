import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <span
        className="cursor-pointer select-none text-2xl md:text-3xl font-bold text-[#212936]"
        onClick={() => router.push('/')}
        style={{ fontFamily: 'inherit', letterSpacing: '0.01em' }}
      >
        <span className="text-[#B71C1C]">Ganesh</span>Cart
      </span>
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar