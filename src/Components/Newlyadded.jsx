import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { API_BASE_URL, getCategories} from '../api/apiServices'
import { newlyaddedProducts } from '../api/apiServices';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#900566",
        borderRadius: "50%",
        zIndex: 1,
        cursor: "pointer",
        marginRight: "8px",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#900566",
        borderRadius: "50%",
        zIndex: 1,
        cursor: "pointer",
        marginLeft: "8px",
      }}
      onClick={onClick}
    />
  );
}

function Newlyadded() {

const [products, setProducts] = useState([]);


useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await newlyaddedProducts(); // Fetch categories from backend
        // console.log("Fetched Data",response)
        setProducts(response.products);
        console.log("asdfghfdsfghfds",response) // Store fetched categories
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};
fetchProducts();
}, []);

 
  const settings = {
    className: "center",
    // infinite: products.length > 5,
    centerPadding: "60px",
    slidesToShow: Math.min(5,products.length),
    swipeToSlide: true,
    speed: 500,
    cssEase: "ease-in-out",
    arrows: true,
    lazyLoad: "ondemand",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: function (index) {
      console.log(`Slider Changed to: ${index + 1}`);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, products.length),
          slidesToScroll: 1,
          infinite: products.length > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1,products.length),
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };


 

  return (
    <>
      <div className="flex flex-col justify-center items-center p-2 mt-10 w-full">
        <div
        //  style={{ width: sliderWidth }}
 className="p-8 w-full overflow-x-hidden transition-all duration-500 ">
          <div className="flex text-3xl font-bold justify-center items-center">
            <h1>Latest Products</h1>
          </div>
          {products && products.length > 0 ? (       
          <Slider {...settings}>
          {products.map((product) => (
            <Link
            to={`/Productdetails/${product.name}`}
            >
              <div className="flex flex-col justify-center items-center mt-4 w-40  ml-4 ">
                <img
                  src={`${API_BASE_URL}${product.images}`}
                  className="border rounded-xl bg-gray-400 hover:scale-110 transition-transform duration-300 object-cover h-48 w-48"
                  alt={product.name}
                />
                <div className="text-bold text-2xl mt-4">{product.name}</div>
              </div>
            </Link>
          ))}
        </Slider>
       ) :(<div className="flex justify-center items-center h-16 bg-gray-300 mt-4 rounded-md shadow-md animate-pulse">
        <span className="text-2xl font-bold text-gray-700">Loading.............</span>
      </div>
      )}
        </div>
      </div>
    </>
  );
}
export default Newlyadded;

//   const [categoryName, setCategoryName] = useState('');
//   const sliderWidth = `${products.length * 14}rem`; // Assuming each slide is 12rem wide