import React from 'react';
import { genders } from '../Constant';
import { Link } from 'react-router-dom';

function ShopbyGender() {
  return (
    <div className=' flex flex-col justify-center items-center p-2 mt-10 w-full bg-white p-8 ' >
      <div className=' flex text-3xl font-bold justify-center items-center '>
        <h1>Discover Your Look</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-6 justify-center w-full items-center p-4  mt-8">
        {genders.map((e) => (
          <Link
            to={`/Productlist/gender/${e.gender}`}
            key={e.id}>
            <div className="relative w-48 h-96 md:w-48 md:h-56 lg:w-72 lg:h-80">
              {/* Image */}
              <img
                src={e.imgURL}
                className="w-full h-full object-cover border rounded-lg hover:scale-105 transition-transform duration-300"
              />
              {/* Category Title Overlay */}
              <div className="absolute inset-0 flex items-end  justify-center  font-semibold text-lg md:text-xl lg:text-lg">
                <span className='bg-white w-3/4 text-center mb-3 rounded'>{e.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default ShopbyGender;