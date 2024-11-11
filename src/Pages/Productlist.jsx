import React from 'react'
import { useParams, useLocation } from 'react-router-dom';

import Productcard from '../Components/Productcard'
import Filtercard from '../Components/Filtercard'
import { getProductsByCategory, getProductsByGender ,applyFilters } from '../api/apiServices';
import { useState, useEffect } from 'react';


function Productlist() {
  const {  categoryName , gender  } = useParams();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      try {
          let response;
        if (categoryName) {
          response = await getProductsByCategory(categoryName);
          console.log("Category Name:", response);
        } else if (gender) {
          response = await getProductsByGender(gender);
          console.log("Gender:", response);
        } else {
          throw new Error("Category or gender not specified");
        }
        const productData = response.data.products || response.data; // Adjust if necessary
        console.log("API response:", productData);

        const filteredProducts = selectedPrice.length > 0 || selectedColor.length > 0 || selectedSize.length > 0
            ? applyFilters(productData, { selectedPrice, selectedColor, selectedSize })
            : productData;
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    if (categoryName || gender) {
      fetchProducts();
    }
  }, [categoryName, gender, selectedPrice, selectedColor, selectedSize]);

  const updateFilterOptions = (price, color, size) => {
    setSelectedPrice(price);
    setSelectedColor(color);
    setSelectedSize(size);
  };
  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }
  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }
  console.log("products.............", products)

  return (
      <div className='flex lg:flex-row flex-col mb-4'>
        <div className='lg:w-1/5'>
          <Filtercard
            selectedPrice={selectedPrice}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            updateFilterOptions={updateFilterOptions}
          /></div>
        <div className='container md:mx-auto w-4/5 sm:w-full sm:ml-6 mt-28 '>
          <div>
            <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold ml-2'>Our <span className='text-blue-500'> </span>Products</h2>
          </div>
          <div className='flex flex-wrap gap-2 justify-center md:flex-row  md-flex-wrap '>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <Productcard key={product._id} {...product} />
              ))
            ) : (
              <div>No products available in this category</div> // Message when no products found
            )}
          </div>
        </div>
      </div>
  )
}
export default Productlist