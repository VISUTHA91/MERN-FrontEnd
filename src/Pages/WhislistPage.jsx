import { useState } from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { fetchuserWishlist, API_BASE_URL } from "../api/apiServices";
import { IoClose } from "react-icons/io5"; // Import Close Icon
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../api/apiServices";
import { addCart } from "../api/apiServices";



const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size
  const [selectedColor, setSelectedColor] = useState(""); // State for selected color
  const [qty, setQty] = useState(1);



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
  console.log("sdfghjkldfghjkl;dfghjk", wishlist);



  const removeWishlist = async (productid) => {
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

  const handleQuantityChange = (event) => {
    setQty(event.target.value);
    console.log(event.target.value)
  };


  const addToCart = async () => {
    const cartItem = {
      productId: items._id,
      size: selectedSize,
      color: selectedColor,
      quantity: qty,
      price: items.final_price,
    };

    try {
      const response = await addCart(cartItem);


      console.log("...............................", response);
      alert("Product Added to Cart Successfully");

    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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

            <div key={item._id} className="border rounded-lg p-4 w-60 shadow-md bg-white relative">
              <button
                className="bg-gray-500 text-white px-2 py-1 rounded-full flex items-center absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeWishlist(item._id);
                }}
              >
                <IoClose size={20} />
              </button>
              <Link to={`/Productdetails/${item.name}`} state={{ productId: item._id }} key={item._id}>
                <img
                  src={`${API_BASE_URL}${item.images[0]}`}
                  alt={item.name}
                  className="h-48 w-56 object-cover rounded-lg mb-3 "
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">{item.price}</p>
              </Link>
              <div className="mt-3 flex justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(item);
                    setSelectedSize(item?.variants?.[0]?.size || ""); // Default to first size if available
                    setSelectedColor(item.color || ""); // Default color
                    setIsModalOpen(true);
                  }}
                >
                  <FaShoppingCart className="mr-2" /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>

            <img
              src={`${API_BASE_URL}${selectedProduct.images[0]}`}
              alt={selectedProduct.name}
              className="w-full h-40 object-cover rounded-lg mt-4"
            />
            <div className='text-3xl'> ₹{selectedProduct.final_price} </div>


            <div className="mt-4">
              <label className="font-bold">Select Size:</label>
              <div className="flex gap-2 mt-2">
                {selectedProduct?.variants?.map((variant) => (
                  <button
                    key={variant.size}
                    className={`border border-black rounded-full h-8 w-8 ${selectedSize === variant.size ? "bg-black text-white" : ""
                      }`}
                    onClick={() => setSelectedSize(variant.size)}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>


            <div className="flex items-center">
              <label htmlFor="qty" className="mr-2 font-bold">Quantity:</label>
              <select
                id="qty"
                className="p-1 border border-black rounded text-center bg-transparent"
                value={qty}
                onChange={handleQuantityChange}
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  if (!selectedSize || !selectedColor) {
                    alert("Please select size and color before adding to cart.");
                    return;
                  }
                  addToCart(selectedProduct._id, selectedSize, selectedColor, qty); // Add to cart
                  // removeWishlist(selectedProduct._id); // Remove from wishlist
                  setIsModalOpen(false); // Close modal
                }}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                DONE
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;


/* <div className="mt-4">
      <label className="font-bold">Select Color:</label>
      <div className="flex gap-2 mt-2">
        <button
          className={`border border-black rounded-full h-8 w-8 ${
            selectedColor === selectedProduct.color ? "border-black border-2" : ""
          }`}
          onClick={() => setSelectedColor(selectedProduct.color)}
          style={{ backgroundColor: selectedProduct.color }}
        />
      </div>
    </div>*/
