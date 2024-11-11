import React from 'react'
import { price } from '../Constant'
import { Link } from 'react-router-dom'
import { bgimage } from '../assets/Images'

function ShopbyPrice() {
  return (
    
    <div className='flex flex-col justify-center items-center p-4 m-4 mt-6 sm:m-8'>
        <div
          className='p-6 sm:p-8 h-auto sm:h-96 rounded-2xl shadow-[-5px_-6px_5px_rgba(121,22,87,0.3),4px_10px_15px_rgba(121,22,87,0.3)]'
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='text-2xl sm:text-3xl text-white font-bold flex justify-center items-center'>
            <h1>Shop by Budget</h1>
          </div>

          {/* Grid layout for mobile view (2 columns) and larger view (adjustable) */}
          <div  className='grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 justify-center items-center p-6 sm:p-16 bg-transparent lg:flex'>
            {price.map((e) => (
              <Link key={e.id} to={'/ProductList/'} className='mt-1 rounded shadow-2xl'>
                <div 
                className='text-bold text-white text-lg sm:text-2xl flex justify-center items-center h-24 sm:h-28 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 shadow-xl shadow-slate-500'>
                  <button className='p-2 sm:pl-6 sm:pr-6 flex flex-col'>
                    <span className='ml-4 sm:ml-6'>Under</span>
                    <div>
                      ₹<span className='font-bold text-4xl sm:text-6xl'>{e.category}</span>
                    </div>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    
  
  )
}

export default ShopbyPrice