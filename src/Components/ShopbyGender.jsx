
// import React from 'react';
// import { bg } from '../assets/Images';
// import { gender } from '../Constant';

// function ShopbyGender() {
//   return (
//     // <div className="flex  lg:flex-col items-center p-2 mt-10 border lg:w-full gap-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 h-auto sm:h-auto md:h-auto lg:h-92 sm:flex-col md:flex-col    shadow-lg z-40 transition-colors duration-500">
//     <div className=' flex flex-col justify-center items-center p-2 mt-10 w-full ' >
//        <div className='p-8   w-4/5  '>
//       <div className=' flex text-3xl font-bold justify-center items-center'>
//         <h1>Discover Your Look</h1>
//       </div>
//       <div className="flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4 ">
//         {gender.map((e) => (
//           <a href="/ProductList/" key={e.id}>
//             <div className="flex flex-col items-center mt-4 md:w-48 lg:w-52">
//               <img
//                 src={e.imgURL}
//                 alt={e.catogory}
//                 className="border rounded-full bg-gray-200 w-40 h-40 md:w-48 md:h-48 lg:w-60 lg:h-48 hover:scale-110 transition-transform duration-300"
//               />
//               <div className="font-bold text-xl mt-4 lg:text-2xl text-center">
//                 {e.catogory}
//               </div>
//             </div>
//           </a>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// }

// export default ShopbyGender;



import React from 'react';
import { bg } from '../assets/Images';
import { gender } from '../Constant';
import { Link } from 'react-router-dom';

function ShopbyGender() {
  return (
    <div className=' flex flex-col justify-center items-center p-2 mt-10 w-full bg-white p-8 ' >
      <div className=' flex text-3xl font-bold justify-center items-center '>
        <h1>Discover Your Look</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4  mt-8">
        {gender.map((e) => (
          <Link to={'/ProductList/'} key={e.id}>
            <div className="flex flex-col items-center  md:w-48 lg:w-64 bg-gray-400 border border-1 border-black lg:h-80 shadow-2xl">
              <img
                src={e.imgURL}
                alt={e.catogory}
                className="border rounded-full bg-gray-200 w-48 h-80 md:w-48 md:h-48 lg:w-48 lg:h-48 hover:scale-110 transition-transform duration-300"
              />
              <div className="font-bold text-xl mt-10 lg:text-2xl text-center">
                {e.catogory}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShopbyGender;

