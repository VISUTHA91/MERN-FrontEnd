import { useState } from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Classic T-Shirt",
      price: "₹499",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Trendy Hoodie",
      price: "₹899",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const moveToCart = (id) => {
    console.log("Moving to cart", id);
    removeFromWishlist(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaHeart className="text-red-500 mr-2" /> Wishlist
      </h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-md bg-white">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">{item.price}</p>
              <div className="mt-3 flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  onClick={() => moveToCart(item.id)}
                >
                  <FaShoppingCart className="mr-2" /> Move to Cart
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded flex items-center"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FaTrash className="mr-2" /> Remove
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
