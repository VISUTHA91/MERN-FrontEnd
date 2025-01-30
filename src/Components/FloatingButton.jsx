import React from 'react'
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
// import { Wishlist}


function FloatingButton() {
  return (
    <Link
      to="/Wishlist"
      className="fixed w-16 h-16 bottom-10 right-2 bg-fuchsia-900 text-white rounded-full flex items-center justify-center shadow-md hover:bg-fuchsia-700"
  >
    <AiFillHeart className="text-4xl"/>
  </Link>  
  )
}

export default FloatingButton