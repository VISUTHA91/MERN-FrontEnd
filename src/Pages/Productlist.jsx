import React from 'react'
import Productcard from '../Components/Productcard'
import Filtercard from '../Components/Filtercard'

function Productlist() {
  return (
    <>
    <div className='flex flex-row'>
       <div className='w-1/4'> <Filtercard /></div>
      <div className='w-3/4'>  <Productcard /></div>
      </div>
    </>
  )
}

export default Productlist