import React from 'react'
import { bannerr , bestbannerbg } from '../assets/Images'
import { Link } from 'react-router-dom'

function Besttshirt() {
//   return (
//        <div className=" relative flex h-80 justify-center items-center  w-full bg-fuchsia-800 p-8">
//         <div className = 'flex  justify-between  w-3/4'>
//   {/* Left Content */}
//   <div className="text-white w-96 p-4 rounded-md mr-12">
//     <h2 className="text-2xl font-bold  mt-10 leading-10">Enjoy up Your vacations in the Best T- shirts</h2>
//     <p className="text-base mt-10">
//      T-Shirt that Keep you Moving
//     </p>
//     <button  className="mt-6 px-6 py-3 bg-white text-fuchsia-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
//         Explore
//       </button>
//   </div>

//   {/* Right Image */}
//   <div>
//   <img src={bannerr} className="h-72" />
//   </div>
//   </div>

//    {/* Overlay Image */}
  //  <img
  //   src={bestbannerbg} // Replace with the URL of the overlay image
  //   className="absolute inset-0 w-full h-full object-cover opacity-50"
  //   alt="Overlay"
  // />
// </div> 
//   )

// return (
//   <div className="relative flex h-80 md:h-96 lg:h-screen justify-center items-center w-full bg-fuchsia-800 p-4 md:p-8">
//     <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full md:w-3/4">
      
//       {/* Left Content */}
//       <div className="text-white w-full md:w-1/2 lg:w-96 p-4 rounded-md mb-6 md:mr-12 text-center md:text-left">
//         <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mt-4 md:mt-10 leading-8 md:leading-10">
//           Enjoy up Your vacations in the Best T-shirts
//         </h2>
//         <p className="text-sm md:text-base mt-4 md:mt-10">
//           T-Shirt that Keep you Moving
//         </p>
//         <button className="mt-6 px-6 py-3 bg-white text-fuchsia-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
//           Explore
//         </button>
//       </div>

//       {/* Right Image */}
//       <div className="w-full md:w-auto">
//         <img src={bannerr} className="h-40 md:h-72 lg:h-96 mx-auto" alt="Banner" />
//       </div>
//     </div>

//     {/* Overlay Image */}
//     <img
//       src={bestbannerbg}
//       className="absolute inset-0 w-full h-full object-cover opacity-50"
//       alt="Overlay"
//     />
//   </div>
// );



return (
  <div className="relative flex h-80 md:h-96 lg:h-96 justify-center items-center w-full bg-fuchsia-800 p-4 md:p-8">
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full md:w-3/4">
      
      {/* Left Content */}
      <div className="text-white w-full md:w-1/2 lg:w-96 p-4 rounded-md mb-6 md:mr-12 text-center md:text-left">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mt-4 md:mt-10 leading-8 md:leading-10">
          Enjoy up Your vacations in the Best T-shirts
        </h2>
        <p className="text-sm md:text-base mt-4 md:mt-10">
          T-Shirt that Keep you Moving
        </p>
        {/* <Link to={#}> */}
        <button className="mt-6 px-6 py-3 bg-white text-fuchsia-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
          Explore
        </button>
        {/* </Link> */}
      </div>

      {/* Right Image */}
      <div className="w-full md:w-auto">
        <img src={bannerr} className="h-32 md:h-72 lg:h-92 mx-auto -mt-10 lg:mt-8 md:mt-8" alt="Banner" />
      </div>
    </div>

    {/* Overlay Image */}
    <img
      src={bestbannerbg}
      className="absolute inset-0 w-full h-full object-cover opacity-50 "
      alt="Overlay"
    />
  </div>
);

}

export default Besttshirt