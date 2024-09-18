import React from 'react'
import { blue } from '../assets/Images'
import { totalproducts } from '../Constant'
import { Link } from 'react-router-dom'

function Productcard(totalproducts) {
  // {imgURL,saleprice,originalprice,name,offer,id}
  return (
    <Link to={`/Productdetails/${totalproducts.id}`}>
    <div className='flex flex-col bg-white w-60 mt-4 justify-left items-center p-2  gap-2 border  rounded-xl border-1 border-black transition transform hover:scale-105 hover:shadow-2xl duration-300'>
      
      <div className='bg-gray-200 rounded-xl'>
        <img src={totalproducts.imgURL[0]} className='h-48 w-56 '></img>
      </div>
      {/* <div className='justify-start items-start'><p>Men's Cotton Stretch Solid Polo T-Shirt (Regular Fit)</p></div> */}
      <div className='justify-start items-start'><p>{totalproducts.name}</p></div>
      <div className='flex flex-row gap-2'>
      <div className=' text-2xl'>₹ {totalproducts.saleprice} </div>
      <div className='leading-9'>M.R.P:₹<span className='line-through'>{totalproducts.originalprice}</span></div>
      <div className='leading-9 text-emerald-400'>{totalproducts.offer}% OFF</div>
      </div>
      {/* <button className='border border-2 rounded p-1 px-4'>View</button> */}
    </div>
    </Link>
  )
}

export default Productcard