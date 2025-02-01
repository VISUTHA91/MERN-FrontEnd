// import React from 'react'
// import { useState } from 'react'
// import { addToWishlist } from '../api/apiServices';
// import { blue } from '../assets/Images'
// // import { totalproducts } from '../Constant'
// import { Link, useNavigate } from 'react-router-dom'
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";



// function Productcard({_id, name, MRP, final_price, images, addToWishlist, product}) {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const navigate = useNavigate();

//   console.log("Product", product);
//   const handleWishlistClick = async () => {
//     setIsWishlisted(!isWishlisted);
//     console.log("Producttttttttttttt", _id);

//     const token = localStorage.getItem('authToken'); // Check if the user is logged in
//     if (!token) {
//         alert('Please login to add items to your cart.');
//         navigate("/Signin")
//         return;
//       }
//       try {
//         await addToWishlist(_id);
//       console.log("Product added to wishlist successfully!");
//     } catch (error) {
//       console.error("Failed to add product to wishlist");
//     }
//   };

//   return (


//     <Link
//     to={`/Productdetails/${name}`}
//     state={{ productId: _id }}
//     key={_id}
//   >
//     <div className="flex flex-col bg-white w-60 mt-4 justify-left items-center p-2 gap-2 border rounded-xl border-1 border-black transition transform hover:scale-105 hover:shadow-2xl duration-300">
//       <div className="bg-gray-200 rounded-xl relative">
//         <img
//           src={`http://192.168.20.5:3000/${images[0]}`}
//           alt={name}
//           className="h-48 w-56"
//         />
//         <div
//           onClick={(e) => {
//             e.preventDefault(); 
//             e.stopPropagation(); 
//             handleWishlistClick();
//           }}
//           className="absolute top-2 right-2 cursor-pointer bg-white p-2 rounded-full shadow-md"
//         >
//           {isWishlisted ? (
//             <AiFillHeart className="text-red-500 text-xl" />
//           ) : (
//             <AiOutlineHeart className="text-gray-500 text-xl" />
//           )}
//         </div>
//       </div>
//       <div className="justify-start items-start">
//         <p>{name}</p>
//       </div>
//       <div className="flex flex-row gap-2">
//         <div className="text-2xl">₹ {final_price}</div>
//         <div className="leading-9">
//           M.R.P:₹<span className="line-through">{MRP}</span>
//         </div>
//       </div>
//     </div>
//   </Link>
//   )
// }
// export default Productcard

//     // <Link 
//     // to={`/Productdetails/${name}`}
//     // state={{ productId: _id }}
//     // key={_id}
//     // >
//     // <div className='flex flex-col bg-white w-60 mt-4 justify-left items-center p-2  gap-2 border  rounded-xl border-1 border-black transition transform hover:scale-105 hover:shadow-2xl duration-300'>

//     //   <div className='bg-gray-200 rounded-xl relative'>
//     //     <img 
//     //                 src={`http://192.168.20.5:3000/${images[0]}`}
//     //                 alt={name}  className='h-48 w-56 '/>
//     //      <div
//     //         onClick={(e) => {
//     //           e.stopPropagation(); // Prevent Link navigation
//     //           handleWishlistClick(); // Handle Wishlist Logic
//     //         }}
//     //         className="absolute top-2 right-2 cursor-pointer bg-white p-2 rounded-full shadow-md"
//     //       >
//     //         {isWishlisted ? (
//     //           <AiFillHeart className="text-red-500 text-xl" />
//     //         ) : (
//     //           <AiOutlineHeart className="text-gray-500 text-xl" />
//     //         )}
//     //       </div>
//     //   </div>
//     //   <div className='justify-start items-start'><p>{name}</p></div>
//     //   <div className='flex flex-row gap-2'>
//     //   <div className=' text-2xl'>₹ {final_price} </div>
//     //   <div className='leading-9'>M.R.P:₹<span className='line-through'>{MRP}</span></div>
//     //   {/* <div className='leading-9 text-emerald-400'>{totalproducts.offer}% OFF</div> */}
//     //   </div>
//     //   {/* <button className='border border-2 rounded p-1 px-4'>View</button> */}
//     // </div>
//     // </Link>




import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist, checkIfWishlisted, API_BASE_URL } from "../api/apiServices"; // Ensure these functions are defined
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { fetchuserWishlist } from "../api/apiServices";


function Productcard({ _id, name, MRP, final_price, images }) {
  const [wishlist, setWishlist] = useState({ items: [] });
  const navigate = useNavigate();
  const isWishlisted = wishlist?.items?.some(item => item._id === _id);
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetchuserWishlist(); // Fetch API
        setWishlist(response || { items: [] }); // ✅ Ensure default structure
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };
    fetchWishlist();
  }, []);
  const toggleWishlist = async (productId) => {
    try {
      if (wishlist.items.some(item => item._id === productId)) {
        await removeFromWishlist(productId);
        // isWishlisted(false)
        setWishlist((prev) => ({
          ...prev,
          items: prev.items.filter(item => item._id !== productId),
        }));
      } else {
        await addToWishlist(productId);
        // isWishlisted(true)
        setWishlist((prev) => ({
          ...prev,
          items: [...prev.items, { _id: productId }],
        }));
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };


  return (
    <div className="flex flex-col bg-white w-60 mt-4 justify-left items-center p-2 gap-2 border rounded-xl border-1 border-black transition transform hover:scale-105 hover:shadow-2xl duration-300 relative">
      <button
        className={`absolute top-2 right-2 p-2 rounded-full ${isWishlisted ? "text-red-500" : "text-gray-500"
          }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(_id)
        }}>
        {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>
      <div className="bg-gray-200 rounded-xl ">
        <Link to={`/Productdetails/${name}`} state={{ productId: _id }} key={_id}>
          <img
            src={`${API_BASE_URL}${images?.[0]}`}
            alt={name}
            className="h-48 w-56"
          />
        </Link>

      </div>
      <div className="justify-start items-start">
        <p>{name}</p>
      </div>
      <div className="flex flex-row gap-2">
        <div className="text-2xl">₹ {final_price}</div>
        <div className="leading-9">
          M.R.P: ₹<span className="line-through">{MRP}</span>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
{/* <div
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 cursor-pointer bg-white p-2 rounded-full shadow-md"
          >
            {isWishlisted ? (
              <AiFillHeart className="text-red-500 text-xl" />
            ) : (
              <AiOutlineHeart className="text-gray-500 text-xl" />
            )}
          </div> */}


          // useEffect(() => {
  //   const checkWishlistStatus = async () => {
  //     try {
  //       const token = localStorage.getItem("authToken");
  //       if (!token) return;
  //       const isWishlisted = await checkIfWishlisted(_id); // API call to check if the product is in wishlist
  //       setIsWishlisted(isWishlisted);
  //     } catch (error) {
  //       // console.error("Error checking wishlist status:", error);
  //     }
  //   };

  //   checkWishlistStatus();
  // }, [_id]);

  // const handleWishlistClick = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     alert("Please login to manage your wishlist.");
  //     navigate("/Signin");
  //     return;
  //   }

  //   try {
  //     if (isWishlisted) {
  //       await removeFromWishlist(_id); // API call to remove from wishlist
  //       // setIsWishlisted(false);
  //       console.log("Product removed from wishlist");
  //     } else {
  //       await addToWishlist(_id); // API call to add to wishlist
  //       // setIsWishlisted(true);
  //       console.log("Product added to wishlist");
  //     }
  //   } catch (error) {
  //     console.error("Failed to update wishlist:", error);
  //   }
  // };