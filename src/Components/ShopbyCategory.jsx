// import React from 'react'
// import { products } from '../Constant'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// const settings = {
//   className: "center",
//   infinite: true,
//   centerPadding: "60px",
//   slidesToShow: 5,
//   swipeToSlide: true,
//   speed: 500,
//   cssEase: "ease-in-out",
//   arrows: true,
//   // dots: true,
//   lazyLoad: "ondemand",
//   nextArrow: <NextArrow />,
//   prevArrow: <PrevArrow />,
//   afterChange: function(index) {
//     console.log(
//       `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
//     );
//   }
// }


// // Next Arrow Component
// function NextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         background: "#900566",  // Customize background color
//         borderRadius: "50%",    // Make it circular
//         // padding: "-5px",
//         // right: "-20px",
//         zIndex: 1,
//         cursor: "pointer",
//         marginRight:"8px"
//       }}
//       onClick={onClick}
//     >
//       {/* <span style={{ fontSize: '24px', color: 'white' }}>→</span> */}
//     </div>
//   );
// }

// // Previous Arrow Component
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
//         // padding: "1px",
//         // left: "-30px",
//         zIndex: 1,
//         cursor: "pointer",
//         marginLeft:"8px"
//       }}
//       onClick={onClick}
//     >
//       {/* <span style={{ fontSize: '50px', color: 'black',marginLeft:'-20px' }}>←</span> */}
//     </div>
//   );
// }

// // const settings = {
// //   infinite: true,
// //   slidesToShow: 5,
// //   swipeToSlide: true,
// //   nextArrow: <NextArrow />,
// //   prevArrow: <PrevArrow />
// // };



// function ShopbyCategory() {
//   return (
//     <>
//     <div className=' flex flex-col justify-center items-center p-2 mt-10  w-full' >
//       <div className= 'p-8 w-full overflow-x-hidden '>
//         <div className=' flex text-3xl font-bold justify-center items-center'>
//             <h1>Explore By Categories</h1>
//             </div>

//         {/* <div className='flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4  '> */}
//         <Slider className='flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4 ' {...settings}>
//           {products.map((e) => (
//             <a href='/ProductList/'><div key={e.id} className=' justify-center items-center mt-4 ml-8 w-40 '>

//                 <img src={e.imgURL} sizes={60}  className='border rounded-full justify-center items-center bg-gray-200 hover:scale-110 '></img>
//             <div className=' text-bold text-2xl flex justify-center items-center mt-4'>{e.category}</div>
//             </div>
//             </a>
//           ))
//         }  </ Slider>

//         {/* </div> */}

        
//         </div>
//     </div>


//     </>
//   )
// }

// export default ShopbyCategory




import React from 'react';
import { products } from '../Constant';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  className: "center",
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 5,
  swipeToSlide: true,
  speed: 500,
  cssEase: "ease-in-out",
  arrows: true,
  lazyLoad: "ondemand",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  afterChange: function (index) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  },
  // Responsive settings
  responsive: [
    {
      breakpoint: 1024, // For screens <= 1024px
      settings: {
        slidesToShow: 3, // Show 3 slides on tablets
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 768, // For screens <= 768px
      settings: {
        slidesToShow: 2, // Show 2 slides on small tablets
        slidesToScroll: 1,
        arrows: true,   // Optionally hide arrows on mobile for better UX
      }
    },
    {
      breakpoint: 480, // For screens <= 480px (mobile devices)
      settings: {
        slidesToShow: 2, // Show 1 slide on mobile
        slidesToScroll: 1,
        arrows: true,   // Optionally hide arrows on mobile for better UX
      }
    }
  ]
};

// Next Arrow Component
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
        marginRight: "8px"
      }}
      onClick={onClick}
    >
      {/* Add icon or arrow content if needed */}
    </div>
  );
}

// Previous Arrow Component
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
        marginLeft: "8px"
      }}
      onClick={onClick}
    >
      {/* Add icon or arrow content if needed */}
    </div>
  );
}

function ShopbyCategory() {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-2 mt-10 w-full">
        <div className="p-8 w-full overflow-x-hidden">
          <div className="flex text-3xl font-bold justify-center items-center">
            <h1>Explore By Categories</h1>
          </div>

          <Slider className="flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4" {...settings}>
            {products.map((e) => (
              <a href='/ProductList/' key={e.id}>
                <div className='flex flex-col justify-center items-center mt-4 ml-8 w-40'>
                  <img
                    src={e.imgURL}
                    sizes={60}
                    className='border rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300'
                    alt={e.category}
                  />
                  <div className='text-bold text-2xl mt-4'>{e.category}</div>
                </div>
              </a>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default ShopbyCategory;


