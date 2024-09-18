// import React from 'react'
// import { useState } from 'react';
// import { green, yellow } from '../assets/Images';
// import { useEffect } from 'react';

// function Filtercard() {
//   // const isMobile = window.innerWidth < 640; // Detect mobile screens
//   const [isMenuOpen, setIsMenuOpen] = useState(false);



//   const [selectedPrice, setSelectedPrice] = useState({
//     option1: false,
//     option2: false,
//     option3: false,
//     option4: false,
//   });
//   const [selectedColor, setSelectedColor] = useState({
//     blue: false,
//     brown: false,
//     black: false,
//     red: false,
//     green: false,
//     pink: false,
//     white: false,
//     yellow: false,
//   });
//   const [selectedSize, setSelectedSize] = useState({
//     s: false,
//     m: false,
//     l: false,
//     xl: false,
//   });

//   const handleColorChange = (colorName) => {
//     setSelectedColor((prevState) => ({
//       ...prevState,
//       [colorName]: !prevState[colorName],
//     }));
//   };

//   const handlePriceChange = (event) => {
//     const { name, checked } = event.target;
//     setSelectedPrice((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };
//   const handleSizeChange = (event) => {
//     const { name, checked } = event.target;
//     setSelectedSize((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // console.log('Checked Items:', selectedPrice);

//     console.log('Selected Prices:', selectedPrice);
//     console.log('Selected Colors:', selectedColor);
//     console.log('Selected Sizes:', selectedSize);
//   };
//   const clearFilters = () => {
//     setSelectedColor([]); // Reset colors
//     setSelectedPrice([]);//Reset price
//     setSelectedSize([]) // Reset size
//   };

//   return (
//     <div className='flex flex-col  bg-white ml-4 mt-28 p-2 gap-2'>
//       <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
//         <h1 className="text-lg mb-2 sm:mb-0">Filters:</h1>
//         <button
//           onClick={clearFilters}
//           className="px-3 py-2 border-2 rounded hover:bg-red-600 transition">
//           Clear Filters
//         </button>
//       </div>
//       <hr className="border-t-2 border-gray-300 my-1" />
//       <form onSubmit={handleSubmit} className=''>
//         <p>Price:</p>
//         <div className='flex flex-col gap-2'>
//           <label>
//             <input
//               type="checkbox"
//               name="option1"
//               checked={selectedPrice.option1}
//               onChange={handlePriceChange} className='mr-2 h-4 w-4'
//             />under ₹ 300
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               name="option2"
//               checked={selectedPrice.option2}
//               onChange={handlePriceChange} className='mr-2 h-4 w-4'
//             />₹ 300 to ₹ 499
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="option3"
//               checked={selectedPrice.option3}
//               onChange={handlePriceChange} className='mr-2 h-4 w-4'
//             />₹ 500 to ₹ 899

//           </label>
//           <label className=''>
//             <input
//               type="checkbox"
//               name="option4"
//               checked={selectedPrice.option4}
//               onChange={handlePriceChange} className='mr-2 h-4 w-4'
//             />above ₹ 900
//           </label></div>
//         <hr className="border-t-2 border-gray-300 my-2" />

//         <p>Color:</p>
//         <div className='flex flex-wrap gap-2 mt-4'>
//           {/* <input type='button'  name="red" className='border border-black  bg-red-500 h-10 w-10'onClick={() => handleColorChange('red')}/> */}
//           <button
//             type='button'
//             className={`border border-black  h-8 w-8 bg-red-500 ${selectedColor.red ? 'border-black border-2' : 'border-1'
//               }`}
//             onClick={() => handleColorChange('red')}
//           />
//           <input type="button" name="green" className={`border border-black h-8 w-8 bg-green-500 ${selectedColor.green ? 'border-black border-2' : 'border-1'
//             }`} onClick={() => handleColorChange('green')} />
//           <input type="button" name="blue" className={`border border-black h-8 w-8 bg-blue-500 ${selectedColor.blue ? 'border-black border-2' : 'border-1'
//             }`} onClick={() => handleColorChange('blue')} />
//           <input type="button" name="white" className={`border border-black h-8 w-8 bg-white ${selectedColor.white ? 'border-black border-2' : 'border-1'
//             }`} onClick={() => handleColorChange('white')} />
//           <input type="button" name="pink" className={`border border-black h-8 w-8 bg-pink-500 ${selectedColor.pink ? 'border-black border-2' : 'border-1'
//             }`} onClick={() => handleColorChange('pink')} />
//           <input type="button" name="brown" className={`border border-black h-8 w-8 bg-rose-800 ${selectedColor.brown ? 'border-black border-2' : 'border-1'
//             }`} onClick={() => handleColorChange('brown')} />
//           <input type="button" name="black" className={`border border-black h-8 w-8 bg-black ${selectedColor.black ? 'border-black border-2' : 'border-1'
//             }`} onClick={() => handleColorChange('black')} />
//           <input type="button" name="yellow" className={`border border-black h-8 w-8 bg-yellow-500 ${selectedColor.yellow ? 'border-black border-2' : 'border-1'
//             }`} onClick={() => handleColorChange('yellow')} />
//         </div>
//         <hr className="border-t-2 border-gray-300 my-2" />

//         <p>Size:</p>
//         <div className='flex flex-wrap gap-2 mt-2'>
//           <label>
//             <input type="checkbox" name="s" checked={selectedSize.s} onChange={handleSizeChange} className='mr-2 h-4 w-4' />S</label>
//           <br />
//           <label>
//             <input type="checkbox" name="m" checked={selectedSize.m} onChange={handleSizeChange} className='mr-2 h-4 w-4' />M</label><br />
//           <label>
//             <input type="checkbox" name="l" checked={selectedSize.l} onChange={handleSizeChange} className='mr-2 h-4 w-4' />XL</label><br />
//           <label>
//             <input type="checkbox" name="xl" checked={selectedSize.xl} onChange={handleSizeChange} className='mr-2 h-4 w-4' />XXL</label>
//         </div>
//         {/* <div className='justify-center items-center'> */}
//         <button type="submit" className='p-2 border border-1 rounded m-4 lg:ml-20 sm:ml-6 bg-fuchsia-600 '>Apply</button>
//         {/* </div> */}
//       </form>

//     </div>

// //     <div className="flex lg:flex-col flex-col bg-white p-4 mt-24 w-96 lg:w-1/5 border border-black">
// //   {/* Filters Header */}
// //   <div className="flex flex-col sm:justify-between items-start sm:items-center bg-blue-200 sm:w-full">
// //     <h1 className="text-lg font-semibold mb-2 sm:mb-0">Filters:</h1>
// //     <button
// //       onClick={clearFilters}
// //       className="px-3 py-2 border-2 rounded-lg hover:bg-red-600 hover:text-white transition">
// //       Clear Filters
// //     </button>
// //   </div>

// //   <hr className="border-t-2 border-gray-300 my-1" />

// //   {/* Filter Form */}
// //   <form onSubmit={handleSubmit}>
// //     <div className='lg:flex-col  flex flex-row gap-4'>
// //     {/* Price Filter */}
// //     <div>
// //       <p className="font-medium">Price:</p>
// //       {isMobile ? (
// //         <select
// //           onChange={handlePriceChange}
// //           className="border p-2 rounded-lg w-full"
// //           value={selectedPrice}
// //         >
// //           <option value="">Select</option>
// //           <option value="option1">Under ₹ 300</option>
// //           <option value="option2">₹ 300 to ₹ 499</option>
// //           <option value="option3">₹ 500 to ₹ 899</option>
// //           <option value="option4">Above ₹ 900</option>
// //         </select>
// //       ) : (
// //         <div className="flex flex-col gap-2">
// //           <label className="flex items-center">
// //             <input
// //               type="checkbox"
// //               name="option1"
// //               checked={selectedPrice.option1}
// //               onChange={handlePriceChange}
// //               className="mr-2 h-4 w-4"
// //             />
// //             Under ₹ 300
// //           </label>
// //           <label className="flex items-center">
// //             <input
// //               type="checkbox"
// //               name="option2"
// //               checked={selectedPrice.option2}
// //               onChange={handlePriceChange}
// //               className="mr-2 h-4 w-4"
// //             />
// //             ₹ 300 to ₹ 499
// //           </label>
// //           <label className="flex items-center">
// //             <input
// //               type="checkbox"
// //               name="option3"
// //               checked={selectedPrice.option3}
// //               onChange={handlePriceChange}
// //               className="mr-2 h-4 w-4"
// //             />
// //             ₹ 500 to ₹ 899
// //           </label>
// //           <label className="flex items-center">
// //             <input
// //               type="checkbox"
// //               name="option4"
// //               checked={selectedPrice.option4}
// //               onChange={handlePriceChange}
// //               className="mr-2 h-4 w-4"
// //             />
// //             Above ₹ 900
// //           </label>
// //         </div>
// //       )}
// //     </div>

// //     <hr className="border-t-2 border-gray-300 my-2" />

// //     {/* Color Filter */}
// //     <div>
// //       <p className="font-medium">Color:</p>
// //       {isMobile ? (
// //         <select
// //           onChange={(e) => handleColorChange(e.target.value)}
// //           className="border p-2 rounded-lg w-full"
// //           value={selectedColor}
// //         >
// //           <option value="">Select</option>
// //           <option value="red">Red</option>
// //           <option value="green">Green</option>
// //           <option value="blue">Blue</option>
// //           <option value="white">White</option>
// //           <option value="pink">Pink</option>
// //           <option value="brown">Brown</option>
// //           <option value="black">Black</option>
// //           <option value="yellow">Yellow</option>
// //         </select>
// //       ) : (
// //         <div className="flex flex-wrap gap-3 mt-2">
// //           <button
// //             type="button"
// //             className={`h-8 w-8 rounded-full bg-red-500 ${selectedColor === 'red' ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}
// //             onClick={() => handleColorChange('red')}
// //           />
// //           <button
// //             type="button"
// //             className={`h-8 w-8 rounded-full bg-green-500 ${selectedColor === 'green' ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
// //             onClick={() => handleColorChange('green')}
// //           />
// //           {/* Repeat for other colors */}
// //         </div>
// //       )}
// //     </div>

// //     <hr className="border-t-2 border-gray-300 my-2" />

// //     {/* Size Filter */}
// //     <div>
// //       <p className="font-medium">Size:</p>
// //       {isMobile ? (
// //         <select
// //           onChange={(e) => handleSizeChange(e.target.value)}
// //           className="border p-2 rounded-lg w-full"
// //           value={selectedSize}
// //         >
// //           <option value="">Select</option>
// //           <option value="s">S</option>
// //           <option value="m">M</option>
// //           <option value="l">L</option>
// //           <option value="xl">XL</option>
// //           <option value="xxl">XXL</option>
// //         </select>
// //       ) : (
// //         <div className="flex flex-wrap gap-2 mt-2">
// //           <label className="flex items-center">
// //             <input
// //               type="checkbox"
// //               name="s"
// //               checked={selectedSize.s}
// //               onChange={handleSizeChange}
// //               className="mr-2 h-4 w-4"
// //             />
// //             S
// //           </label>
// //           <label className="flex items-center">
// //             <input
// //               type="checkbox"
// //               name="m"
// //               checked={selectedSize.m}
// //               onChange={handleSizeChange}
// //               className="mr-2 h-4 w-4"
// //             />
// //             M
// //           </label>
// //           {/* Repeat for other sizes */}
// //         </div>
// //       )}
// //     </div>
// //     </div>

// //     <button
// //       type="submit"
// //       className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
// //       Apply Filters
// //     </button>
// //   </form>
// // </div>

//   )
// }

// export default Filtercard



import React, { useState } from 'react';
import { green, yellow } from '../assets/Images'; // Update or remove these imports if not used

function Filtercard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const [selectedColor, setSelectedColor] = useState({
    blue: false,
    brown: false,
    black: false,
    red: false,
    green: false,
    pink: false,
    white: false,
    yellow: false,
  });
  const [selectedSize, setSelectedSize] = useState({
    s: false,
    m: false,
    l: false,
    xl: false,
  });

  const handleColorChange = (colorName) => {
    setSelectedColor((prevState) => ({
      ...prevState,
      [colorName]: !prevState[colorName],
    }));
  };

  const handlePriceChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPrice((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSizeChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSize((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Prices:', selectedPrice);
    console.log('Selected Colors:', selectedColor);
    console.log('Selected Sizes:', selectedSize);
  };

  const clearFilters = () => {
    setSelectedColor({
      blue: false,
      brown: false,
      black: false,
      red: false,
      green: false,
      pink: false,
      white: false,
      yellow: false,
    });
    setSelectedPrice({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });
    setSelectedSize({
      s: false,
      m: false,
      l: false,
      xl: false,
    });
  };

  return (
    <div>
      {/* Hamburger Menu Button */}
      <button
        className="lg:hidden p-2 border rounded-lg bg-blue-500 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {/* Filter Card */}
      <div
        className={`fixed inset-0 bg-white p-4 mt-28 shadow-lg transition-transform transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:relative lg:translate-x-0 lg:bg-white lg:shadow-none`}
      >
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center ">
          <h1 className="text-lg font-semibold mb-2 lg:mb-0">Filters:</h1>
          <button
            onClick={clearFilters}
            className="px-3 py-2 border-2 rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            Clear Filters
          </button>
        </div>
        <hr className="border-t-2 border-gray-300 my-2" />
        <form onSubmit={handleSubmit}>
          <p className="font-medium">Price:</p>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                name="option1"
                checked={selectedPrice.option1}
                onChange={handlePriceChange}
                className="mr-2 h-4 w-4"
              />{' '}
              Under ₹ 300
            </label>
            <label>
              <input
                type="checkbox"
                name="option2"
                checked={selectedPrice.option2}
                onChange={handlePriceChange}
                className="mr-2 h-4 w-4"
              />{' '}
              ₹ 300 to ₹ 499
            </label>
            <label>
              <input
                type="checkbox"
                name="option3"
                checked={selectedPrice.option3}
                onChange={handlePriceChange}
                className="mr-2 h-4 w-4"
              />{' '}
              ₹ 500 to ₹ 899
            </label>
            <label>
              <input
                type="checkbox"
                name="option4"
                checked={selectedPrice.option4}
                onChange={handlePriceChange}
                className="mr-2 h-4 w-4"
              />{' '}
              Above ₹ 900
            </label>
          </div>
          <hr className="border-t-2 border-gray-300 my-2" />
          <p className="font-medium">Color:</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-red-500 ${
                selectedColor.red ? 'ring-2 ring-offset-2 ring-red-500' : ''
              }`}
              onClick={() => handleColorChange('red')}
            />
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-green-500 ${
                selectedColor.green ? 'ring-2 ring-offset-2 ring-green-500' : ''
              }`}
              onClick={() => handleColorChange('green')}
            />
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-blue-500 ${
                selectedColor.blue ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              onClick={() => handleColorChange('blue')}
            />
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-white ${
                selectedColor.white ? 'ring-2 ring-offset-2 ring-gray-500' : ''
              }`}
              onClick={() => handleColorChange('white')}
            />
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-pink-500 ${
                selectedColor.pink ? 'ring-2 ring-offset-2 ring-pink-500' : ''
              }`}
              onClick={() => handleColorChange('pink')}
            />
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-rose-800 ${
                selectedColor.brown ? 'ring-2 ring-offset-2 ring-rose-800' : ''
              }`}
              onClick={() => handleColorChange('brown')}
            />
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-black ${
                selectedColor.black ? 'ring-2 ring-offset-2 ring-black' : ''
              }`}
              onClick={() => handleColorChange('black')}
            />
            <button
              type="button"
              className={`border border-black h-8 w-8 bg-yellow-500 ${
                selectedColor.yellow ? 'ring-2 ring-offset-2 ring-yellow-500' : ''
              }`}
              onClick={() => handleColorChange('yellow')}
            />
          </div>
          <hr className="border-t-2 border-gray-300 my-2" />
          <p className="font-medium">Size:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <label>
              <input
                type="checkbox"
                name="s"
                checked={selectedSize.s}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              S
            </label>
            <label>
              <input
                type="checkbox"
                name="m"
                checked={selectedSize.m}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              M
            </label>
            <label>
              <input
                type="checkbox"
                name="l"
                checked={selectedSize.l}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              L
            </label>
            <label>
              <input
                type="checkbox"
                name="xl"
                checked={selectedSize.xl}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              XL
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
          </form>
          </div>
        </div>
  )
}
export default Filtercard;
       
