import React from 'react'
import { blue } from '../assets/Images'

function Productcard() {
  return (
    <div className='flex flex-col bg-white w-60 mt-28 justify-center items-center p-2 ml-2 gap-2 border border-1 border-black'>
      
      <div className='bg-gray-200'>
        <img src={blue} className='h-48 w-56 '></img>
      </div>
      <div className='justify-start items-start'><p>Men's Cotton Stretch Solid Polo T-Shirt (Regular Fit)</p></div>
      <div className='flex flex-row gap-2'>
      <div className=' text-2xl'>₹ 449 </div>
      <div className='leading-9'>M.R.P:₹<span className='line-through'>599</span></div>
      <div className='leading-9 text-emerald-400'>30% OFF</div>
      </div>
      <button className='border border-2 rounded p-1 px-4'>View</button>
      
    </div>
  )
}

export default Productcard