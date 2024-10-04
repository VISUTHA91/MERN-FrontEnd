import React from 'react'
import Productcard from '../Components/Productcard'
import Filtercard from '../Components/Filtercard'
// import { totalproducts } from '../Constant'
import { getProductsByCategory } from '../api/apiServices';
import { useParams , useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Productlist() {


  const { categoryName } = useParams(); // Get category name from the URL
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await getProductsByCategory(categoryName);
        setProducts(response.data.data); // Set fetched products
        console.log(response.data.data)
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to fetch products'); // Set error message
        setLoading(false); // End loading on error
      }
    };

    if (categoryName) {
      fetchProducts(); // Fetch products when categoryName changes
    }
  }, [categoryName]); // Dependency array to trigger when categoryName changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  console.log("products.............",products)


  return (
    <>
    <div className='flex lg:flex-row flex-col mb-4'>
       <div className='lg:w-1/5'> 
       {/* <div className="lg:w-1/5 w-full mb-8 lg:mb-0"> */}
       <Filtercard /></div>
      <div className='container md:mx-auto w-4/5 sm:w-full sm:ml-6 mt-28 '>
      <div>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold ml-2'>Our <span className='text-blue-500'> </span>Products</h2>
      </div>
      <div className='flex flex-wrap gap-2 justify-center md:flex-row  md-flex-wrap '>
      {products.length > 0 ? (
              products.map((product) => (

                <Productcard key={product._id} {...product} />
              ))
            ) : (
              <div>No products available in this category</div> // Message when no products found
            )}
      </div>
    </div> 

      </div>
    </>
  )
}

export default Productlist