import React from 'react'
import { supplyBanner } from '../assets/Images'
import { SiTicktick } from "react-icons/si";


function Supply() {
  return (
    
    <div className='lg:w-full lg:p-10 sm:p-0 sm:w-full relative'>

        <img src={supplyBanner}></img>
        <div className='absolute flex flex-col left-0 top-0 lg:gap-6 gap-2 sm:gap-8  sm:left-8 sm:top-6 lg:left-24 lg:top-28 xl:left-32 xl:top-32 translate-x-4 translate-y-4'>
      {/* 'absolute flex flex-col translate-x-6 translate-y-6 left-6 top-24 sm:left-12 sm:top-6 lg:left-24 lg:top-16 gap-8'   */}
            <h1 className='text-white  text-xs sm:text-2xl lg:text-4xl font-bold decoration-8'>Register as a [NAME] Supplier</h1>
            <p className='text-white text-sm sm:text-xs sm:text-wrap lg:text-xl'>Sell your products to crores of customers at 0% commission</p>
            <div className='flex flex-row text-white lg:gap-8 sm:gap-4'>
                <div className='flex flex-row lg:gap-3 sm:gap-2  text-xs sm:text-xs'><SiTicktick className='sm:size-28 lg:size-8'/><p>Grow your Business 10x</p></div>
                <div className='w-1 bg-white h-6'></div>
                <div className='flex flex-row lg:gap-3 sm:gap-2 text-xs sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Enjoy 100% Profit</p></div>
                <div className='w-1 bg-white h-6'></div>
                <div className='flex flex-row lg:gap-3 sm:gap-2 text-xs sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Sell All Over India</p></div>
            </div>
            <button className='bg-white text-fuchsia-950 decoration-4 w-32 h-10 rounded font-bold'>Sign Up Now</button>
        </div>

    </div>
    
    
    

  )
}

export default Supply