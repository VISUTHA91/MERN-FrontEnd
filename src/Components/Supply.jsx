import React from 'react'
import { supplyBanner } from '../assets/Images'
import { SiTicktick } from "react-icons/si";


function Supply() {
  return (

    <div className='lg:w-full lg:p-10 sm:p-0 sm:w-full relative'>

      <img src={supplyBanner}></img>
      <div className='absolute flex flex-col left-0 top-0 lg:gap-6 gap-2 sm:gap-8  sm:left-8 sm:top-6 lg:left-24 lg:top-28 xl:left-32 xl:top-32 translate-x-4 translate-y-4'>
        <div className='flex flex-row text-white lg:gap-8 sm:gap-4 '>
          <div className='flex flex-row lg:gap-3 sm:gap-2  lg:text-xl sm:text-xs'><SiTicktick className='sm:size-28 lg:size-8' /><p> 24/7 Customer Support</p></div>
          <div className='w-1 bg-white h-6'></div>
          <div className='flex flex-row lg:gap-3 sm:gap-2  lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Trending Styles</p></div>
          <div className='w-1 bg-white h-6'></div>
          <div className='flex flex-row lg:gap-3 sm:gap-2 lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p>Fastest Delivery</p></div>
        </div>


        <div className='flex flex-row text-white lg:gap-8 sm:gap-4'>
          <div className='flex flex-row lg:gap-3 sm:gap-2  lg:text-xl sm:text-xs'><SiTicktick className='sm:size-28 lg:size-8' /><p>100 % Secure Payment</p></div>
          <div className='w-1 bg-white h-6'></div>
          <div className='flex flex-row lg:gap-3 sm:gap-2 lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Easy Exchange</p></div>
          <div className='w-1 bg-white h-6'></div>
          <div className='flex flex-row lg:gap-3 sm:gap-2 lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Budget Friendly</p></div>
        </div>

      </div>

    </div>

  )
}

export default Supply

{/* <button className='bg-white text-fuchsia-950 decoration-4 w-32 h-10 rounded font-bold'>Shop</button> */ }