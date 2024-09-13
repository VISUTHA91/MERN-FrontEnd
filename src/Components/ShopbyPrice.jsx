import React from 'react'
import { price } from '../Constant'
import { Link } from 'react-router-dom'

function ShopbyPrice() {
  return (
    <>
      <div className=' flex flex-col justify-center items-center p-4 m-8 mt-10 ' >
        <div className='bg-white p-4'>
        <div className=' flex text-3xl font-bold justify-center items-center'>
          <h1>Shop by Budget</h1>
        </div>
        <div className='flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4 '>
          {
            price.map((e) => (
              <Link to={'/ProductList/ '} className='border border-6 rounded shadow-xl'><div key={e.id} className='justify-center  items-center mt-0 w-80 h-80  rounded-tr-3xl rounded-br-3xl  '>
                <img src={e.imgURL} sizes={96} className='pt-8 border justify-center items-center bg-gray-400 border-2 '></img>
                <div className='text-bold text-white text-2xl flex justify-center items-center h-24 '><button className='border  bg-fuchsia-900 p-2 pl-6 pr-6 rounded-2xl'>{e.category}</button></div>
              </div></Link>
            ))}
        </div>
        </div>
      </div>


    </>
  )
}

export default ShopbyPrice