import React from 'react'
import { supplyBanner } from '../assets/Images'
import { SiTicktick } from "react-icons/si";
import { Link } from 'react-router-dom';


function Supply() {
  // return (
  
{/* <div className="relative lg:w-full lg:p-10 sm:p-0 sm:w-full">
      <img 
      className='rounded'
        alt="download-meesho-app" 
        loading="lazy" 
        width="1106" 
        height="290" 
        decoding="async" 
        style={{ color: "transparent" }} 
        src={supplyBanner}
        // "https://images.meesho.com/images/pow/supplyBannerDesktop_1106.webp" 
      />
      <div className="absolute left-0 top-0  text-white flex flex-col gap-4 p-4 ml-20 mt-16 ">
        <span className="text-3xl font-bold">Register as a Evvi Supplier</span>
        <p className="sub-title text-l">Sell your products to crores of customers at 0% commission</p>
        
        <div className="text-white flex flex-row gap-12 mt-4">
          <span className="SupplierBanner__StyledSpan flex gap-2">
            <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-pyfCe">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z" 
                fill="#06A759" 
              />
            </svg>
            <p className="text-point font-semibold text-sm">Grow your business 10x</p>
          </span>

          <span className="SupplierBanner__StyledSpan flex gap-2">
            <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-pyfCe">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z" 
                fill="#06A759" 
              />
            </svg>
            <p className="text-point font-semibold text-sm">Enjoy 100% Profit</p>
          </span>

          <span className="SupplierBanner__StyledSpan flex gap-2">
            <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-pyfCe">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z" 
                fill="#06A759" 
              />
            </svg>
            <p className="text-point font-semibold text-sm">Sell all over India</p>
          </span>
        </div>
        <button 
  className="bg-white text-fuchsia-900 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out mt-4 w-48"
  type="button"
>
  Sign Up Now
</button>
      </div>
    </div> */}
    return (
      <div className="relative w-full p-4 lg:p-10 ">
      <img 
        className="rounded-2xl w-full h-auto" 
        alt="download-meesho-app" 
        loading="lazy" 
        decoding="async" 
        src="https://images.meesho.com/images/pow/supplyBannerDesktop_1106.webp" 
        style={{ color: "transparent" }} 
      />
      <div className="absolute left-0 top-0 text-white flex flex-col gap-2 p-4 w-full lg:w-1/2 xl:w-1/3 lg:ml-20 lg:mt-16 mt-2 md:ml-8">
        <span className="text-l sm:text-l md:text-2xl lg:text-4xl font-bold mt-2 lg:mt-8">Register as an Evvi Supplier</span>
        <p className="text-sm lg:text-lg">Sell your products to crores of customers at 0% commission</p>

        <div className="hidden lg:flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
          <span className="flex gap-2 items-center">
            <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z" 
                fill="#06A759" 
              />
            </svg>
            <p className="font-semibold text-xs sm:text-sm md:text-base">Grow your business 10x</p>
          </span>

          <span className="flex gap-2 items-center ">
            <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z" 
                fill="#06A759" 
              />
            </svg>
            <p className="font-semibold text-xs sm:text-sm md:text-base">Enjoy 100% Profit</p>
          </span>

          <span className="flex gap-2 items-center">
            <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z" 
                fill="#06A759" 
              />
            </svg>
            <p className="font-semibold text-xs sm:text-sm md:text-base">Sell all over India</p>
          </span>
        </div>
        <Link to={'/Vendor/VendorSignup'}>

        <button 
          className="bg-white hover:bg-fuchsia-900 hover:text-white text-xs lg:text-xl text-fuchsia-900 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out mt-2 lg:mt-4 w-32 sm:w-32 lg:w-52 "
          type="button">
          Sign Up Now
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Supply

{/* <button className='bg-white text-fuchsia-950 decoration-4 w-32 h-10 rounded font-bold'>Shop</button> */ }
 //   <div className='lg:w-full lg:p-10 sm:p-0 sm:w-full relative'>

  //     <img src={supplyBanner}></img>
  //     {/* <div className='absolute flex flex-col left-0 top-0 lg:gap-6 gap-2 sm:gap-8  sm:left-8 sm:top-6 lg:left-24 lg:top-28 xl:left-32 xl:top-32 translate-x-4 translate-y-4'>
  //       <div className='flex flex-row text-white lg:gap-8 sm:gap-4 '>
  //         <div className='flex flex-row lg:gap-3 sm:gap-2  lg:text-xl sm:text-xs'><SiTicktick className='sm:size-28 lg:size-8' /><p> 24/7 Customer Support</p></div>
  //         <div className='w-1 bg-white h-6'></div>
  //         <div className='flex flex-row lg:gap-3 sm:gap-2  lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Trending Styles</p></div>
  //         <div className='w-1 bg-white h-6'></div>
  //         <div className='flex flex-row lg:gap-3 sm:gap-2 lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p>Fastest Delivery</p></div>
  //       </div>


  //       <div className='flex flex-row text-white lg:gap-8 sm:gap-4'>
  //         <div className='flex flex-row lg:gap-3 sm:gap-2  lg:text-xl sm:text-xs'><SiTicktick className='sm:size-28 lg:size-8' /><p>100 % Secure Payment</p></div>
  //         <div className='w-1 bg-white h-6'></div>
  //         <div className='flex flex-row lg:gap-3 sm:gap-2 lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Easy Exchange</p></div>
  //         <div className='w-1 bg-white h-6'></div>
  //         <div className='flex flex-row lg:gap-3 sm:gap-2 lg:text-xl sm:text-xs'><SiTicktick className='sm:size-24 lg:size-8' /><p> Budget Friendly</p></div>
  //       </div>

  //     </div> */}

  // </div>
