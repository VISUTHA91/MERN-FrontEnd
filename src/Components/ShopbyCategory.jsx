// import React from 'react';
// import { products } from '../Constant';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { API_BASE_URL, getCategories} from '../api/apiServices'


// // const settings = {
// //   className: "center",
// //   infinite: true,
// //   centerPadding: "60px",
// //   slidesToShow: 5,
// //   swipeToSlide: true,
// //   speed: 500,
// //   cssEase: "ease-in-out",
// //   arrows: true,
// //   lazyLoad: "ondemand",
// //   nextArrow: <NextArrow />,
// //   prevArrow: <PrevArrow />,
// //   afterChange: function (index) {
// //     console.log(
// //       `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
// //     );
// //   },
// //   // Responsive settings
// //   responsive: [
// //     {
// //       breakpoint: 1024, // For screens <= 1024px
// //       settings: {
// //         slidesToShow: 3, // Show 3 slides on tablets
// //         slidesToScroll: 1,
// //         infinite: true,
// //       }
// //     },
// //     {
// //       breakpoint: 768, // For screens <= 768px
// //       settings: {
// //         slidesToShow: 2, // Show 2 slides on small tablets
// //         slidesToScroll: 1,
// //         arrows: true,   // Optionally hide arrows on mobile for better UX
// //       }
// //     },
// //     {
// //       breakpoint: 480, // For screens <= 480px (mobile devices)
// //       settings: {
// //         slidesToShow: 2, // Show 1 slide on mobile
// //         slidesToScroll: 1,
// //         arrows: true,   // Optionally hide arrows on mobile for better UX
// //       }
// //     }
// //   ]
// // };

// // Next Arrow Component






// // function NextArrow(props) {
// //   const { className, style, onClick } = props;
// //   return (
// //     <div
// //       className={className}
// //       style={{
// //         ...style,
// //         display: "block",
// //         background: "#900566",
// //         borderRadius: "50%",
// //         zIndex: 1,
// //         cursor: "pointer",
// //         marginRight: "8px"
// //       }}
// //       onClick={onClick}
// //     >
// //       {/* Add icon or arrow content if needed */}
// //     </div>
// //   );
// // }

// // // Previous Arrow Component
// // function PrevArrow(props) {
// //   const { className, style, onClick } = props;
// //   return (
// //     <div
// //       className={className}
// //       style={{
// //         ...style,
// //         display: "block",
// //         background: "#900566",
// //         borderRadius: "50%",
// //         zIndex: 1,
// //         cursor: "pointer",
// //         marginLeft: "8px"
// //       }}
// //       onClick={onClick}
// //     >
// //       {/* Add icon or arrow content if needed */}
// //     </div>
// //   );
// // }


// function NextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         background: "#900566",
//         borderRadius: "50%",
//         zIndex: 1,
//         cursor: "pointer",
//         marginRight: "8px",
//       }}
//       onClick={onClick}
//     />
//   );
// }

// function PrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         background: "#900566",
//         borderRadius: "50%",
//         zIndex: 1,
//         cursor: "pointer",
//         marginLeft: "8px",
//       }}
//       onClick={onClick}
//     />
//   );
// }

// function ShopbyCategory() {

//   const [categories, setCategories] = useState([]);
//   const [categoryName, setCategoryName] = useState('');
//   const sliderWidth = `${categories.length * 14}rem`; // Assuming each slide is 12rem wide

//   const settings = {
//     className: "center",
//     infinite: categories.length > 5,
//     centerPadding: "60px",
//     slidesToShow: Math.min(5, categories.length),
//     swipeToSlide: true,
//     speed: 500,
//     cssEase: "ease-in-out",
//     arrows: true,
//     lazyLoad: "ondemand",
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     afterChange: function (index) {
//       console.log(`Slider Changed to: ${index + 1}`);
//     },
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(3, categories.length),
//           slidesToScroll: 1,
//           infinite: categories.length > 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: Math.min(2, categories.length),
//           slidesToScroll: 1,
//           arrows: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: Math.min(1, categories.length),
//           slidesToScroll: 1,
//           arrows: false,
//         },
//       },
//     ],
//   };


//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getCategories(); // Fetch categories from backend
//         // console.log("Fetched Data",response)
//         setCategories(response.data); // Store fetched categories
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);



//   return (
//     <>
//       <div className="flex flex-col justify-center items-center p-2 mt-10 w-full">
//         <div style={{ width: sliderWidth }}
//  className="p-8 w-full overflow-x-hidden transition-all duration-500 ">
//           <div className="flex text-3xl font-bold justify-center items-center">
//             <h1>Explore By Categories</h1>
//           </div>
//           {categories && (
//           // <Slider className="flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4" {...settings}>
//           // {categories.map((category) => (
//           //     <Link 
//           //     to={`/Productlist/${category.name}`}
//           //      key={category._id}
//           //      state={{ categoryId: category._id }}>
//           //       <div className='flex flex-col justify-center items-center mt-4 ml-8 w-40 '>
//           //          <img
//           //           src={`http://192.168.20.5:3000/${category.image}`}
//           //           className='border rounded-xl bg-gray-400 hover:scale-110 transition-transform duration-300 object-cover h-48 w-48'
//           //           alt={category.name}/>
//           //         <div className='text-bold text-2xl mt-4'>{category.name}</div>
//           //       </div>
//           //     </Link>
//           //   ))}
//           // </Slider>
         
//           <Slider {...settings}>
//           {categories.map((category) => (
//             <Link
//               to={`/Productlist/${category.name}`}
//               key={category._id}
//               state={{ categoryId: category._id }}
//             >
//               <div className="flex flex-col justify-center items-center mt-4 w-40  ml-4 ">
//                 <img
//                   src={`${API_BASE_URL}${category.image}`}
//                   className="border rounded-xl bg-gray-400 hover:scale-110 transition-transform duration-300 object-cover h-48 w-48"
//                   alt={category.name}
//                 />
//                 <div className="text-bold text-2xl mt-4">{category.name}</div>
//               </div>
//             </Link>
//           ))}
//         </Slider>
//        )}
//         </div>
//       </div>
//     </>
//   );
// }
// export default ShopbyCategory;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { API_BASE_URL, getCategories } from '../api/apiServices';

// function NextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: 'block',
//         background: '#900566',
//         borderRadius: '50%',
//         zIndex: 1,
//         cursor: 'pointer',
//         marginRight: '8px',
//       }}
//       onClick={onClick}
//     />
//   );
// }

// function PrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: 'block',
//         background: '#900566',
//         borderRadius: '50%',
//         zIndex: 1,
//         cursor: 'pointer',
//         marginLeft: '8px',
//       }}
//       onClick={onClick}
//     />
//   );
// }

// function ShopbyCategory() {
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const sliderWidth = `${categories.length * 14}rem`; // Assuming each slide is 14rem wide

//   const settings = {
//     className: 'center',
//     infinite: categories.length > 5,
//     centerPadding: '60px',
//     slidesToShow: Math.min(5, categories.length),
//     swipeToSlide: true,
//     speed: 500,
//     cssEase: 'ease-in-out',
//     autoplay: true,               // Enable auto-play
//     autoplaySpeed: 3000,          // Set interval to 3 seconds
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(4, categories.length), // Shows 4 slides for tablets
//           slidesToScroll: 1,
//           infinite: categories.length > 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: Math.min(3, categories.length),
//           slidesToScroll: 1,
//           arrows: true,
//           centerPadding: '10px', // Adding a little space around the center slide
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: Math.min(1, categories.length),
//           slidesToScroll: 1,
//           arrows: false,
//           speed: 300,            // Faster transition for mobile screens
//           centerMode: true,      // Ensures smoother transition and alignment for mobile
//           focusOnSelect: true,   // Make the selected slide center
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getCategories();
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setError('Failed to load categories');
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center p-2 mt-10 w-full">
//         <div style={{ width: sliderWidth }} className="p-8 w-full overflow-x-hidden transition-all duration-500">
//           <div className="flex text-3xl font-bold justify-center items-center mb-4">
//             <h1>Explore By Categories</h1>
//           </div>

//           {error ? (
//             <div className="text-red-500 mt-4">{error}</div>
//           ) : categories.length === 0 ? (
//             <div>Loading categories...</div>
//           ) : (
//             <Slider {...settings}>
//               {categories.map((category) => (
//                 <Link
//                   to={`/Productlist/${category.name}`}
//                   key={category._id}
//                   state={{ categoryId: category._id }}
//                 >
//                   <div className="flex flex-col justify-center items-center mt-4 w-40 ml-4">
//                     <img
//                       src={`${API_BASE_URL}${category.image}`}
//                       className="border rounded-xl bg-gray-400 hover:scale-110 transition-transform duration-300 object-cover h-48 w-48"
//                       alt={category.name}
//                       loading="lazy"
//                     />
//                     <div className="text-bold text-2xl mt-4">{category.name}</div>
//                   </div>
//                 </Link>
//               ))}
//             </Slider>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ShopbyCategory;import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API_BASE_URL, getCategories } from '../api/apiServices';
import { useState , useEffect } from 'react';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !bg-[#900566] !rounded-full cursor-pointer z-10 mr-2`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !bg-[#900566] !rounded-full cursor-pointer z-10 ml-2`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function ShopbyCategory() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const settings = {
    infinite: categories.length > 1, // Avoid infinite scroll if only 1 category exists
    slidesToShow: categories.length < 5 ? categories.length : 5, // Show correct number of slides
    slidesToScroll: 1,
    swipeToSlide: true,
    speed: 500,
    cssEase: 'ease-in-out',
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablets & small laptops
        settings: {
          slidesToShow: categories.length < 4 ? categories.length : 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile tablets
        settings: {
          slidesToShow: categories.length < 3 ? categories.length : 3,
          slidesToScroll: 1,
          arrows: true,
          
        },
      },
      {
        breakpoint: 480, // Small mobile screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          speed: 300,
          centerMode: true,
          centerPadding: '20px', // Ensures smooth transition on mobile
          focusOnSelect: true,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4 mt-10 w-full">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Explore By Categories</h1>

        {error ? (
          <div className="text-red-500 mt-4">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-lg">Loading categories...</div>
        ) : (
          <Slider {...settings}>
            {categories.map((category) => (
              <Link
                to={`/Productlist/${category.name}`}
                key={category._id}
                state={{ categoryId: category._id }}
                className="flex flex-col justify-center items-center mx-2 "
              >
                <img
                  src={`${API_BASE_URL}${category.image}`}
                  className="border rounded-xl bg-gray-300 hover:scale-105 transition-transform duration-300 object-cover h-40 w-40 sm:h-48 sm:w-48 md:h-52 md:w-52"
                  alt={category.name}
                  loading="lazy"
                />
                <div className="text-lg sm:text-xl font-semibold mt-3">{category.name}</div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default ShopbyCategory;