import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import { totalproducts } from '../Constant';
import Sizechart from '../Components/Sizechart';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductsById } from '../api/apiServices';
import  { API_BASE_URL } from '../api/apiServices';

function Productdetails({_id ,images, price}) {
  const navigate = useNavigate()
  // const { name } = useParams();              // Get the name from params
  const location = useLocation();
  const productId = location.state?.productId;

  // const { _id } = location.state || {};
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');

  // const product = totalproducts.find((p) => p.id === _id);
  // const product = totalproducts.find((p) => p.id === productId);

  const [activeImage, setActiveImage] = useState(images?.[0] || ''); // Default to the first image or an empty string
  // const [activeImage, setActiveImage] = useState(images);
  // const [activeImage, setActiveImage] = useState({`http://192.168.20.5:3000/${images[0]}`});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null);


  // useEffect(() => {
  //   if (productId) {
  //     const fetchedProduct = totalproducts.find((p) => p.id === productId);
  //     if (fetchedProduct) {
  //       setProduct(fetchedProduct);
  //       // setActiveImage(fetchedProduct.images[0]); // Set default active image
  //       setActiveImage(`${baseUrl}${fetchedProduct.images[0]}`);      }
  //   }
  // }, [productId]);

  useEffect(() => {
    if (product) {
      // Set the first image in the array as the default active image
      setActiveImage(`${API_BASE_URL}${product.images[0]}`);
    }
  }, [product]);


  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProductsById(productId)
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


  // const handleMouseEnterProduct = (images) => {
  //   setActiveImage(images)
  // }

  const handleMouseEnterProduct = (image) => {
    setActiveImage(`${API_BASE_URL}${image}`); // Update the state with the hovered image URL
  };
  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  }

  const handleQuantityChange = (event) => {
    setQty(event.target.value);
  };

  function addToCart() {
    const userData = JSON.parse(localStorage.getItem("userData")); 
    console.log(".................",userData)

    if (userData) {
      const productWithqty = { ...product, qty };

      if (localStorage.getItem("cart-items") != null) {

        let cartItems = JSON.parse(localStorage.getItem("cart-items"))
        localStorage.setItem("cart-items", JSON.stringify([...cartItems, productWithqty]))
      }
      else {
        localStorage.setItem("cart-items", JSON.stringify([productWithqty]))
      }

      // toast.success("Cart Item added succesfully!")
      alert("Cart Item added succesfully!")
      navigate("/Cart")
    } else {
      alert("You must login to add products to the cart!")
      navigate("/Signup")
    }
  }


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


  return (
    // <div className='lg:flex lg:flex-row sm:flex sm:flex-col '>

    <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-12 ">

      {/* <div className='w-1/2  flex max-lg:flex-col gap-1 h-96 sm:justify-center items-center ml-28 border border-2 rounded-xl lg:mt-32  mb-64 bg-gray-400' key={product.id}> */}
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 lg:ml-16 border rounded-lg p-4 bg-gray-200  lg:mt-32">

        {/* <div className=' flex justify-center relative max-h-full items-center'> */}
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">

          {/* <div className='w-96'> */}
          <img
            // src={`${API_BASE_URL}${product.images[0]}`}
            src={activeImage ? activeImage : `${API_BASE_URL}${product.images[0]}`}


            // src={activeImage}
            // src={`${images[0]}`}
            size='96'
            // width={480}
            // height={480} 
            alt='image'></img>
          {/* </div> */}

          {/* <div className='flex sm:gap-2 absolute  sm:-bottom-20'> */}
          <div className="flex gap-2 mt-4">

            {/* <div className='flex gap-2'> */}
            {
             product.images && product.images.map((image, index, _id) => (
                <div key={index} className="w-16 h-16 sm:w-20 sm:h-20">
                  <img
                    // src={images}
                    // src={`${API_BASE_URL}${images}`}
                    src={`${API_BASE_URL}${image}`}

                    alt={`product image ${index}`}
                    width={80}
                    height={80}
                    // className='hover:border border-black rounded-xl cursor-pointer max-sm:flex-1 border'
                    // onClick={() => handleMouseEnterProduct(imageURL)}
                    className={`border-black rounded-xl cursor-pointer max-sm:flex-1 border
                      ${activeImage ===  `${API_BASE_URL}${image}` ? 'ring-1 ring-purple-900' : 'border border-1'}`}
                      //  onClick={() => handleMouseEnterProduct(images)}
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
          <div className='text-3xl'>{product.name}</div>
          <div className='text-3xl'> ₹{product.price} </div>
          <div className=' flex flex-row text-2xl gap-4 '>
            <div className='line-through'>
              {/* MRP.₹ {product.originalprice} */}
              MRP.₹ {product.price}
            </div>
            {/* <div className=' text-2xl text-green-400'>({product.offer}% OFF) </div> */}
          </div>
          <div className='text-l'>Price Inclusive all Taxes</div>
        </div>

        {/* select size and color */}
        <div className=' flex flex-col  lg:flex-col gap-2 mt-4'>
          <div className=' font-bold'>Colour : <span className='font-normal'>{selectedColor}</span></div>
          <div className='flex flex-wrap gap-2 mt-2'>
            <input type='button' className={`border border-black  rounded-full  h-8 w-8 bg-red-500 ${selectedColor === 'red' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('red')} />
            <input type="button" name="green" className={`border border-black rounded-full h-8 w-8 bg-green-500 ${selectedColor === 'green' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleColorChange('green')} />
            <input type="button" name="blue" className={`border border-black rounded-full h-8 w-8 bg-blue-500 ${selectedColor === 'blue' ? 'border-black border-2' : 'border-1'
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
              }`} onClick={() => handleColorChange('yellow')} />
          </div>
        </div>
        <div className='flex flex-col font-bold mt-2' >Size : {selectedSize}</div>
        <div className='flex flex-wrap gap-2 mt-2'>
          <Tooltip title="Garment Measurement : Chest - 37.0in" placement="top">
            <input type="button" name="s" value="S" className={`border border-black rounded-full h-8 w-8 ${selectedSize === 's' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleSizeChange('s')} /> </Tooltip>
          <Tooltip title="Garment Measurement : Chest - 39.0in" placement="top">
            <input type="button" name="s" value="M" className={`border border-black rounded-full h-8 w-8 ${selectedSize === 'm' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleSizeChange('m')} /></Tooltip>
          <Tooltip title="Garment Measurement : Chest - 43.0in" placement="top">

            <input type="button" name="s" value="L" className={`border border-black rounded-full h-8 w-8 ${selectedSize === 'l' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleSizeChange('l')} /></Tooltip>
          <Tooltip title="Garment Measurement : Chest - 41.0in" placement="top">
            <input type="button" name="s" value="XL" className={`border border-black rounded-full h-8 w-8 ${selectedSize === 'xl' ? 'border-black border-2' : 'border-1'
              }`} onClick={() => handleSizeChange('xl')} /></Tooltip>
        </div>
        <Sizechart />
        {/* Quantity */}

        <div className="flex items-center">
          <label htmlFor="qty" className="mr-2 font-bold">Quantity:</label>
          <select
            id="quantity"
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
      </div>
    </div>
  )
}

export default Productdetails