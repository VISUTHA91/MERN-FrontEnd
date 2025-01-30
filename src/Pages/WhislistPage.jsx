import { useState } from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { fetchuserWishlist , API_BASE_URL } from "../api/apiServices";
import { IoClose } from "react-icons/io5"; // Import Close Icon



const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

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

    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          const data = await fetchuserWishlist();
          setWishlist(data);
        } catch (error) {
          console.error("Failed to fetch wishlist");
        }
      };
      fetchWishlist();
    }, []);
    console.log("sdfghjkldfghjkl;dfghjk",wishlist);




  // const removeFromWishlist = (_id) => {
  //   setWishlist(wishlist.filter((item) => item._id !== _id));
  // };
  const removeFromWishlist = async (productid) => {
    try {
      await removeFromWishlist(productid);
      setWishlist((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item._id !== productid),
      }));
      console.log("Item removed from wishlist");
      alert("Item removed from wishlist");
    } catch (error) {
      console.error("Failed to remove item from wishlist");
    }
  };





  const moveToCart = (_id) => {
    console.log("Moving to cart", _id);
    removeFromWishlist(_id);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-2xl font-semibold mb-4 flex items-center mt-16">
        <FaHeart className="text-red-500 mr-2" /> Wishlist
      </h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-wrap gap-2 ">
          {wishlist && wishlist.items.map((item) => (
            <div key={item._id} className="border rounded-lg p-4  w-60 shadow-md bg-white relative">
              <img
                // src={item.image}
                src={`${API_BASE_URL}${item.images[0]}`} 

                alt={item.name}
                // className="w-full h-40 object-cover rounded-lg mb-3"
                className="h-48 w-56 object-cover rounded-lg mb-3 "

              />
              <button
                  className="bg-gray-500 text-white px-2 py-1 rounded-full flex items-center absolute top-2 right-2"
                  onClick={() => removeFromWishlist(item._id)}
                >
      <IoClose  size={20}/>
                </button>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">{item.price}</p>
              <div className="mt-3 flex justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  onClick={() => moveToCart(item.id)}
                >
                  <FaShoppingCart className="mr-2" /> Move to Cart
                </button>
              </div>
              
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
