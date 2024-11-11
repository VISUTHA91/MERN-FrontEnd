import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import { totalproducts } from '../Constant';
import Sizechart from '../Components/Sizechart';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductById } from '../api/apiServices';
import { API_BASE_URL } from '../api/apiServices';
import ProductDescription from '../Components/ProductDescription';
import SellerDetails from '../Components/SellerDetails';
import { addCart } from '../api/apiServices';
import ZoomImage from '../Components/ZoomImage';
import { GlassMagnifier } from 'react-image-magnifiers';
import ReactImageMagnify from 'react-image-magnify';
import ReactCursorPosition from 'react-cursor-position';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { kids } from '../assets/Images';






function Productdetails({ _id, images, price }) {
  const navigate = useNavigate()
  const location = useLocation();
  const productId = location.state?.productId;

  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');
  // const [activeImage, setActiveImage] = useState(`${API_BASE_URL}${product.images[0]}`);


  const [activeImage, setActiveImage] = useState(images?.[0] || '');


  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null);
  const productDetails = product?.product_details?.[0]; // Get the first product detail (or whichever is relevant)
  const sellerDetails = product?.seller_details; // Get the first product detail (or whichever is relevant)


  useEffect(() => {
    if (product) {
      // Set the first image in the array as the default active image
      setActiveImage(`${API_BASE_URL}${product.images[0]}`);
    }
  }, [product]);


  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProductById(productId)
        .then((response) => {
          const fetchedProduct = response.data;
          console.log(fetchedProduct);
          setProduct(fetchedProduct.product);
          // setActiveImage(fetchedProduct.product.images[0] ); // Set default active image
          // setActiveImage(`${API_BASE_URL}${product.images[0]}`);

        })
        .catch((err) => {
          console.error('Error fetching product details:', err);
          setError('Failed to fetch product details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);


  const handleMouseEnterProduct = (image) => {
    setActiveImage(`${API_BASE_URL}${image}`); // Update the state with the hovered image URL
  };
  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size.toUpperCase()); // Change to uppercase if required by backend
  }

  const handleQuantityChange = (event) => {
    setQty(event.target.value);
    console.log(event.target.value)
  };

  const addToCart = async () => {
    const token = localStorage.getItem('authToken'); // Check if the user is logged in

    if (!token) {
      alert('Please login to add items to your cart.');
      navigate("/Signin")

      return;
    }

    if (!selectedSize) {
      alert('Please select size ');
      return;
    }

    const cartItem = {
      productId: product._id,
      size: selectedSize,
      color: selectedColor,
      quantity: qty,
      price: product.final_price,
    };

    try {
      // Call the external API service to add product to cart
      const response = await addCart(cartItem);
      // setCartStatus('Product added to cart!');

      console.log("...............................", response);
      alert("Product Added to Cart Successfully");

    } catch (error) {
      console.error('Error adding to cart:', error);
      // setCartStatus('An error occurred. Please try again.');
    }
  };




  const buyNow = () => {
    const addedToCart = addToCart();
    if (addedToCart) {
      // After adding to cart, redirect to the cart page
      navigate('/Cart');
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }




  const imageSrc = activeImage || `${API_BASE_URL}${product.images[0]}`;


  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-12 ">
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 lg:ml-16 border rounded-lg p-4 bg-gray-200  lg:mt-32">
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
          {/* <ZoomImage imgSrc={activeImage ? activeImage : `${API_BASE_URL}${product.images[0]}`} /> */}
          {/* <ZoomImage imgSrc={imageSrc} /> */}

          {/* <ReactCursorPosition> */}
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                // src: activeImage ? activeImage : `${API_BASE_URL}${product.images[0]}`
                 src:imageSrc
              },
              largeImage: {
                //  src: activeImage ? activeImage : `${API_BASE_URL}${product.images[0]}`,
                 src:imageSrc,
                alt:"Kids",
                width: 300,
                height: 300
              },
              enlargedImageContainerDimensions: {
                width: '300%',
                height: '300%',
              },
              enlargedImageContainerStyle: {
                width: '300px', // Set exact width and height for the enlarged image area
                height: '300px',
              },
              // Control the size and style of the magnifying lens
              lensStyle: { 
                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                width: '150px', // Adjust lens size to control visible zoomed area
                height: '150px',
              },
              enlargedImagePosition: 'over'
            }} />
          {/* </ReactCursorPosition> */}


          <div className="flex gap-2 mt-4">
            {
              product.images && product.images.map((image, index, _id) => (
                <div key={index} className="w-16 h-16 sm:w-20 sm:h-20">
                  <img
                    src={`${API_BASE_URL}${image}`}
                    alt={`product image ${index}`}
                    width={80}
                    height={80}
                    className={`border-black rounded-xl cursor-pointer max-sm:flex-1 border
                      ${activeImage === `${API_BASE_URL}${image}` ? 'ring-1 ring-purple-900' : 'border border-1'}`}
                    onMouseEnter={() => handleMouseEnterProduct(image)}
                  />
                </div>
              ))}
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* LEFT Side completed */}


      {/* Right Side Start */}

      <div className=' mt-32 pl-8 lg:flex-col'>
        <div className='flex flex-col gap-4  mr-4'>
          <div className='text-3xl'>{product.name} <span>{product.product_details[0].material_type}</span></div>
          <div className='text-3xl'> ₹{product.final_price} </div>
          <div className=' flex flex-row text-2xl gap-4 '>
            <div className='line-through'>
              MRP.₹ {product.MRP}
            </div>
          </div>
          <div className='text-l'>Price Inclusive all Taxes</div>
        </div>

        {/* select size and color */}
        <div className=' flex flex-col  lg:flex-col gap-2 mt-4'>
          <div className=' font-bold'>Colour : <span className='font-normal'>{selectedColor}</span></div>
          <div className='flex flex-wrap gap-2 mt-2'>
            <input type="button" name={product.color} className={`border border-black rounded-full h-8 w-8 ${selectedColor === product.color ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange(product.color)}
              style={{ backgroundColor: product.color }} />
            {/*<input type="button" name="blue" className={`border border-black rounded-full h-8 w-8 bg-blue-500 ${selectedColor === 'blue' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('blue')} />
            <input type="button" name="white" className={`border border-black rounded-full h-8 w-8 bg-white ${selectedColor === 'white' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('white')} />
            <input type="button" name="pink" className={`border border-black rounded-full h-8 w-8 bg-pink-500 ${selectedColor === 'pink' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('pink')} />
            <input type="button" name="brown" className={`border border-black rounded-full h-8 w-8 bg-rose-800 ${selectedColor === 'brown' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('brown')} />
            <input type="button" name="black" className={`border border-black rounded-full h-8 w-8 bg-black ${selectedColor === 'black' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('black')} />
            <input type="button" name="yellow" className={`border border-black rounded-full h-8 w-8 bg-yellow-500 ${selectedColor === 'yellow' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('yellow')} /> */}
          </div>
        </div>
        <div className='flex flex-col font-bold mt-2' >Size : {selectedSize}</div>

        <div className='flex flex-wrap gap-2 mt-2'>
          {product?.variants?.length > 0 ? (
            product.variants.map((variant, index) => (
              <Tooltip
                key={index}
                title={`Garment Measurement: Chest - ${variant.chest}in`} // Display chest measurement if available
                placement="top"
              >
                <input
                  type="button"
                  name={variant.size.toLowerCase()} // Ensure lowercase for selectedSize comparison
                  value={variant.size}
                  className={`border border-black rounded-full h-8 w-8 ${selectedSize === variant.size.toLowerCase() ? 'border-black border-2' : 'border-1'
                    }`}
                  onClick={() => handleSizeChange(variant.size.toLowerCase())} // Use lowercase to keep consistency
                />
              </Tooltip>
            ))
          ) : (
            <p>No size information available</p> // Fallback if no size is provided
          )}
        </div>

        <Sizechart />
        {/* Quantity */}

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

        {/* Button Section */}
        <div className=' mt-8 flex flex-col lg:flex-row  gap-8 '>
          <button
            onClick={() => addToCart()}
            className="border border-black border-2 rounded-lg hover:bg-red-600 hover:text-white transition lg:w-36 w-full p-2">
            🛒 Add To Cart
          </button>
          <button
            onClick={() => buyNow()}
            className=" border border-black border-2 rounded-lg hover:bg-red-600 hover:text-white transition lg:w-36 p-2">
            Buy Now
          </button>
        </div>

        <div className='mt-8'>
          {productDetails ? (

            <ProductDescription
              material_type={productDetails.material_type}
              sleeve_details={productDetails.sleeve_details}
              fit_type={productDetails.fit_type}
              pattern_type={productDetails.pattern_type}
            />
          ) : (
            <div>No products available in this category</div> // Message when no products found
          )}
        </div>



        <div className='mt-8'>
          {sellerDetails ? (

            <SellerDetails
              name={sellerDetails.name}
              location={sellerDetails.location}
            />
          ) : (
            <div>No Seller Details Available in this Product</div> // Message when no products found
          )}
        </div>
      </div>
    </div>
  )
}

export default Productdetails

{/* <GlassMagnifier
imageSrc={imageSrc}
largeImageSrc={largeImageSrc}
magnifierBorderColor="rgba(0, 0, 0, 0.5)"
magnifierSize="300px" // Adjust size as needed
className="rounded-lg"
/> */}




{/* <Zoom>
            <img
              src={activeImage ? activeImage : `${API_BASE_URL}${product.images[0]}`}
              size='96'
              alt='image'>
            </img>
          </Zoom> */}
{/* <img
              src={activeImage ? activeImage : `${API_BASE_URL}${product.images[0]}`}
              size='96'
              alt='image'>
            </img> */}
