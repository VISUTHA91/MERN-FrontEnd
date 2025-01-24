import React, { useState } from "react";
import ProductCard from "../Components/Productcard"

const Wishlist = ({ products }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      // If the product is already in the wishlist, remove it
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      // Otherwise, add the product to the wishlist
      return [...prevWishlist, product];
    });
  };

  return (
    <div>
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToWishlist={addToWishlist}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8">Wishlist</h2>
      <div className="wishlist grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-item p-4 shadow-md border rounded-md">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <h3 className="text-lg font-bold mt-2">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
