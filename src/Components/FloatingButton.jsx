// import React from 'react'
// import { AiFillHeart } from "react-icons/ai";
// import { Link } from 'react-router-dom';
// // import { Wishlist}


// function FloatingButton() {
//   return (
//     <Link
//       to="/Wishlist"
//       className="fixed w-16 h-16 bottom-10 right-2 bg-fuchsia-900 text-white rounded-full flex items-center justify-center shadow-md hover:bg-fuchsia-700"
//   >
//     <AiFillHeart className="text-4xl"/>
//   </Link>  
//   )
// }

// export default FloatingButton

import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { toast } from 'react-toastify';
 
const WishlistButton = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token"); // Replace with your auth check logic

  const handleWishlistClick = (e) => {
    const token = localStorage.getItem('authToken'); // Check if the user is logged in

    if (!token) {
      toast.warning('Please login to add items to your cart.');
      // showAlert("Please login to add items to your cart.!");

      navigate("/Signin")

      // return;
    }
  };

  return (
    <Link
      to={isAuthenticated ? "/Wishlist" : "/Signin" }
      onClick={handleWishlistClick}
      className="fixed w-16 h-16 bottom-10 right-2 bg-fuchsia-900 text-white rounded-full flex items-center justify-center shadow-md hover:bg-fuchsia-700"
    >
      <AiFillHeart className="text-4xl" />
    </Link>
  );
};

export default WishlistButton;
