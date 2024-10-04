import React from 'react'
import { price } from '../Constant'
import { Link } from 'react-router-dom'
import { bgimage } from '../assets/Images'

function ShopbyPrice() {
  return (
    <>
      <div className=' flex flex-col justify-center items-center p-4 m-8 mt-6 ' >
        <div className=' p-8 h-96 rounded-2xl shadow-[-5px_-6px_5px_rgba(121,22,87,0.3),4px_10px_15px_rgba(121,22,87,0.3)]' 
         style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
        <div className=' flex text-3xl text-white font-bold justify-center items-center'>
          <h1>Shop by Budget</h1>
        </div>
        <div className='flex flex-row flex-wrap  gap-6 justify-center w-full items-center p-16  bg-transperent  '>
          {
            price.map((e) => (
              <Link to={'/ProductList/ '} className='mt-1  rounded shadow-2xl'>
                <div className='text-bold text-white text-2xl flex justify-center items-center h-28 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 shadow-xl shadow-slate-500'>
 {/* box-shadow: 0 4px 6px rgba(255, 255, 255, 0.5) */}
  
                {/* shadow-[-5px_-6px_5px_rgba(121,22,87,0.3),4px_10px_15px_rgba(121,22,87,0.3)] */}


                {/* box-shadow: rgba(255, 255, 254) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px; */}
                  <button className='p-2 pl-6 pr-6 flex flex-col'><span className='ml-6'>Under</span><div>₹<span className='font-bold text-6xl'>{e.category}</span></div></button>
                  </div>
              </Link>
            ))}
        </div>
        </div>
      </div>


    </>
  )
}

export default ShopbyPrice