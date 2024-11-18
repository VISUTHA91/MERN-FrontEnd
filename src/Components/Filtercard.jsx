import React, { useState } from 'react';
import { green, yellow } from '../assets/Images'; // Update or remove these imports if not used
import * as apiCalls from "../api/apiServices.jsx"
import { applyFilters } from '../api/apiServices.jsx';

// function Filtercard({ updateFilterOptions }) {
  function Filtercard({ updateFilterOptions, categoryName , categoryId }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState();

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
    Yellow: false,
  });
  const [selectedSize, setSelectedSize] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
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

  
 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const filters = {
      price: Object.keys(selectedPrice).filter((key) => selectedPrice[key]),
      color: Object.keys(selectedColor).filter((key) => selectedColor[key]),
      size: Object.keys(selectedSize).filter((key) => selectedSize[key]),
    };
    
    try {
      const filteredData = await applyFilters( filters ,categoryId);
      const Data = filteredData.data || filteredData;

      updateFilterOptions(Data); // Pass the filtered data to ProductList
      console.log("Filtered Results:", Data);
    } catch (error) {
      console.error("Failed to apply filters:", error);
    }
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
      "0 - 300": false,
      "300 - 499": false,
      "599 - 899": false,
      "899 - 1500": false,
    });
    setSelectedSize({
      S: false,
      M: false,
      L: false,
      XL: false,
    });
    window.location.reload();
  };

  return (
    <div className='h-full'>
      {/* Hamburger Menu Button */}
      <button
        className="lg:hidden p-2 border rounded-lg bg-blue-500 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {/* Filter Card */}
      <div
        className={`fixed inset-0 bg-white p-4 h-full shadow-lg transition-transform transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:relative lg:translate-x-0 lg:bg-white lg:shadow-none`}
      >
        <div className="flex flex-col lg:flex-row lg:justify-between mt-28 items-start lg:items-center ">
          <h1 className="text-lg font-semibold mb-2 lg:mb-0">Filters:</h1>
          <button
            onClick={clearFilters}
            className="px-3 py-2 border-2 rounded-lg hover:bg-red-600 hover:text-white transition">
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
                // name="option1"
                // checked={selectedPrice.option1}
                name="0 - 300"
                checked={selectedPrice["0 - 300"]}
                onChange={handlePriceChange}
                className="mr-2 h-4 w-4"
              />{' '}
              Under ₹ 300
            </label>
            <label>
              <input
                type="checkbox"
                // name="option2"
                // checked={selectedPrice.option2}
                name="300 - 499"
                checked={selectedPrice["300 - 499"]}
                onChange={handlePriceChange}
                className="mr-2 h-4 w-4"
              />{' '}
              ₹ 300 to ₹ 499
            </label>
            <label>
              <input
                type="checkbox"
                // name="option3"
                // checked={selectedPrice.option3}
                name="500 - 899"
                checked={selectedPrice["500 - 899"]}
                onChange={handlePriceChange}
                className="mr-2 h-4 w-4"
              />{' '}
              ₹ 500 to ₹ 899
            </label>
            <label>
              <input
                type="checkbox"
                // name="option4"
                // checked={selectedPrice.option4}
                name="900 - 1500"
                checked={selectedPrice["900 - 1500"]}
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
                name="S"
                checked={selectedSize.S}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              S
            </label>
            <label>
              <input
                type="checkbox"
                name="M"
                checked={selectedSize.M}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              M
            </label>
            <label>
              <input
                type="checkbox"
                name="L"
                checked={selectedSize.L}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              L
            </label>
            <label>
              <input
                type="checkbox"
                name="XL"
                checked={selectedSize.XL}
                onChange={handleSizeChange}
                className="mr-2 h-4 w-4"
              />{' '}
              XL
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Apply Filters
          </button>
          </form>
          </div>
        </div>
  )
}



export default Filtercard


 // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   const filters = {
  //     price: Object.keys(selectedPrice).filter((key) => selectedPrice[key]),
  //     color: Object.keys(selectedColor).filter((key) => selectedColor[key]),
  //     size: Object.keys(selectedSize).filter((key) => selectedSize[key]),
  //   };
  //   try {
  //     // const result = await applyFilters(filters); 
  //     // const resultData = result.data || result;
  //     updateFilterOptions( filters.price, filters.color, filters.size);
  //     // Assume applyFilters is an API call
  //     console.log("Filtered Results:", filters)
  //   } catch (error) {
  //     console.error("Failed to apply filters:", error);
  //   }
  // };
  
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   const filters = {
  //     price: Object.keys(selectedPrice).filter((key) => selectedPrice[key]),
  //     color: Object.keys(selectedColor).filter((key) => selectedColor[key]),
  //     size: Object.keys(selectedSize).filter((key) => selectedSize[key]),
  //   };
  //   try {
  //     // Send the selected filter options to ProductList
  //     updateFilterOptions(filters.price, filters.color, filters.size);
  //     console.log("Filtered Results:", filters);
  //   } catch (error) {
  //     console.error("Failed to apply filters:", error);
  //   }
  // };