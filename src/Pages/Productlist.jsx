import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import Productcard from '../Components/Productcard'
import Filtercard from '../Components/Filtercard'
import { getProductsByCategory, getProductsByGender ,applyFilters } from '../api/apiServices';
import { useState, useEffect } from 'react';
import { getProductsByFilter } from '../api/apiServices';
import { getProductsByPrice } from '../api/apiServices';
import { FaBoxOpen } from 'react-icons/fa'; // Optional icon for better visuals
import NoProductsMessage from '../Components/NoProductsMessage';
import {Triangle} from 'react-loader-spinner'
import Loader from '../Components/Loader';




function Productlist() {
  const { categoryName, gender} = useParams();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [products, setProducts] = useState([]); 
  // const [price, setPrice] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [message, setMessage] = useState([]);




  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get('price');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (gender) {
          response = await getProductsByGender(gender);
        } else if (categoryName) {
          response = await getProductsByCategory(categoryName);
        }  else if (price) {
          response = await getProductsByPrice(price);
        }
         else {
          throw new Error("Category or gender not specified");
        }
        const productData = response.data.products || response.data;
        setProducts(productData);
        setFilteredProducts(productData);
        setMessage(response.data.message); 
        setTimeout(() =>{
        setLoading(false);
      },1000);

      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    if (categoryName || gender || price ) {
      fetchProducts();
    }
  }, [categoryName, gender, price]);
  
  console.log("Message:",message)
  const updateFilterOptions = (filteredData) => {
    setFilteredProducts(filteredData);
    setProducts(filteredData.products) // Set filtered products from API response
  };
    
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div className='mt-28'>{error}</div>;
  }

  return (
    <div className='flex lg:flex-row flex-col mb-4'>
      <div className='lg:w-1/5'>
        <Filtercard
          updateFilterOptions={updateFilterOptions}
          selectedPrice={selectedPrice}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setSelectedPrice={setSelectedPrice}
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
          categoryName={categoryName}
          categoryId = {categoryId}
        />
      </div>
      <div className='container md:mx-auto w-4/5 sm:w-full sm:ml-6 mt-28 '>
        <div>
          {/* <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold ml-2'>Our Products</h2> */}
        </div>
        {loading ? (
          // <div className='flex mt-32 justify-center items-center'>
          // <Triangle
          // visible={true}
          // height="80"
          // width="80"
          // color="#701a75"
          // ariaLabel="triangle-loading"
          // wrapperStyle={{}}
          // wrapperClass=""
          // />
          // </div>
          <Loader />
        ):(
        <div className='flex flex-wrap gap-4 justify-center md:flex-row  md-flex-wrap '>
          {products && products.length > 0 ? (
            products.map((product) => (
              <Productcard
                key={product._id} {...product}
               />
            ))
          ) : (
          <NoProductsMessage />
          )}
        </div>)}
      </div>
    </div>
  );
}
export default Productlist
