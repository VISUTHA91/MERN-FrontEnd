import React from "react";
import { supplyBanner } from "../assets/Images";
import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";

function Supply() {
  // return (

  {
    /* <div className="relative lg:w-full lg:p-10 sm:p-0 sm:w-full">
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
    </div> */
  }
  return (
    <div className="relative w-full p-4 lg:p-10">
      <img
        className="rounded-2xl w-full h-auto"
        alt="download-meesho-app"
        loading="lazy"
        decoding="async"
        src={supplyBanner}
        style={{ color: "transparent" }}
      />
      {/* <div className="absolute left-0 top-0 text-white flex flex-col gap-y-4 p-4 sm:w-1/2 lg:w-2/3 xl:w-1/2 lg:ml-20 lg:mt-16 mt-1 md:ml-8">
        <span className="sm:text-sm md:text-2xl lg:text-4xl font-bold mt-2 lg:mt-8">
          Register as an Evvi Supplier
        </span>
        <p className="sm:text-sm md:text-base lg:text-lg">
        Sell your products to crores of customers with just a 2% commission.
        </p>
  
        <div className="flex flex-col lg:flex-row lg:gap-x-8 lg:gap-y-4 gap-y-2 mt-4 justify-start items-start">
          {[
            "Grow your business 10x",
            "Enjoy 100% Profit",
            "Sell all over India",
          ].map((text, index) => (
            <div key={index} className="flex items-center gap-3">
              <svg
                width="20"
                height="21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z"
                  fill="#06A759"
                />
              </svg>
              <p className="font-semibold text-sm md:text-base">{text}</p>
            </div>
          ))}
        </div>
  
        <Link to="/Vendor/VendorSignup" className="self-start mt-6">
          <button
            className="bg-white hover:bg-fuchsia-900 hover:text-white text-xs md:text-lg lg:text-xl text-fuchsia-900 font-bold py-2 px-5 rounded-lg transition duration-300 ease-in-out w-36 sm:w-40 lg:w-52"
            type="button"
          >
            Sign Up Now
          </button>
        </Link>
      </div> */}

<div className="absolute left-0 top-0 text-white flex flex-col gap-y-4 p-4 
      w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3
      sm:ml-12 md:ml-8 lg:ml-20 lg:mt-16 mt-2 xs:ml-12">
      
      {/* Heading */}
      <h1 className="text-lg sm:text-lg md:text-2xl lg:text-4xl font-bold">
        Register as an Evvi Supplier
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base md:text-lg">
        Sell your products to crores of customers with just a 2% commission.
      </p>

      {/* Features Section */}
      {/* <div className="flex flex-col lg:flex-row lg:gap-x-8 gap-y-3 mt-4 ">
        {[
          "Grow your business 10x",
          "Enjoy 100% Profit",
          "Sell all over India",
        ].map((text, index) => (
          <div key={index} className="flex items-center gap-3">
            <svg
              width="20"
              height="21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z"
                fill="#06A759"
              />
            </svg>
            <p className="font-semibold text-sm md:text-base">{text}</p>
          </div>
        ))}
      </div> */}

<div className="hidden lg:flex flex-col lg:flex-row lg:gap-x-8 gap-y-3 mt-4">
  {[
    "Grow your business 10x",
    "Enjoy 100% Profit",
    "Sell all over India",
  ].map((text, index) => (
    <div key={index} className="flex items-center gap-3">
      <svg
        width="20"
        height="21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 10.5C0 4.98 4.48.5 10 .5s10 4.48 10 10-4.48 10-10-4.48-10-10Zm7.283 4.293c.39.39 1.02.39 1.41 0l7.58-7.59a.996.996 0 1 0-1.41-1.41l-6.88 6.88-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59Z"
          fill="#06A759"
        />
      </svg>
      <p className="font-semibold text-sm md:text-base">{text}</p>
    </div>
  ))}
</div>


      {/* Button */}
      <Link to="/Vendor/VendorSignup" className="self-start mt-6">
        <button
          className="bg-white hover:bg-fuchsia-900 hover:text-white 
          text-xs sm:text-sm md:text-lg lg:text-xl text-fuchsia-900 
          font-bold py-2 px-5 rounded-lg transition duration-300 ease-in-out 
          w-28 sm:w-36 md:w-40 lg:w-48"
          type="button"
        >
          Sign Up Now
        </button>
      </Link>
    </div>
    </div>
  );
  
  
}

export default Supply;

{
  /* <button className='bg-white text-fuchsia-950 decoration-4 w-32 h-10 rounded font-bold'>Shop</button> */
}
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
