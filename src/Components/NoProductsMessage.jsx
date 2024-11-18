import React from 'react';
import { FaBoxOpen } from 'react-icons/fa'; // Optional icon for better visuals

function NoProductsMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md p-6">
      <FaBoxOpen className="text-gray-400 text-6xl mb-4" />
      <h2 className="text-gray-700 text-lg font-semibold">
        No products available in this category
      </h2>
      <p className="text-gray-500 mt-2 text-center">
        Check back later or explore other categories for more products.
      </p>
    </div>
  );
}

export default NoProductsMessage;
