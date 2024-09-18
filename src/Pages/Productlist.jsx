import React from 'react'
import Productcard from '../Components/Productcard'
import Filtercard from '../Components/Filtercard'
import { totalproducts } from '../Constant'


function Productlist() {
  return (
    <>
    <div className='flex lg:flex-row flex-col mb-4'>
       <div className='lg:w-1/5'> 
       {/* <div className="lg:w-1/5 w-full mb-8 lg:mb-0"> */}
       <Filtercard /></div>
      <div className='container md:mx-auto w-4/5 sm:w-full sm:ml-6 mt-28 '>
      <div>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold ml-2'>Our <span className='text-blue-500'> </span>Products</h2>
      </div>
      <div className='flex flex-wrap gap-2 justify-center md:flex-row  md-flex-wrap '>
      {totalproducts.map((product) => (
          <Productcard key={product.id} {...product} />
        ))}
      </div>
    </div> 

      </div>
    </>
  )
}

export default Productlist