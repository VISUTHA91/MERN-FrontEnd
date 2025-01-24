import React from 'react'
import Hero from '../Components/Hero'
// import ShopbyCategory from '../Components/ShopbyCategory'
import Catogory from './Catogory'
import Standards from '../Components/Standards'
import Supply from '../Components/Supply'
import Besttshirt from '../Components/Besttshirt'
import FloatingButton from '../Components/FloatingButton'

function Home() {
  return (
    <>
    <Hero  />
    <Catogory />
    <Standards />
    <Besttshirt />
    <Supply />  
    <FloatingButton />
    </>
    
  )
}

export default Home