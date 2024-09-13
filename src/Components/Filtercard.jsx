import React from 'react'
import { useState } from 'react';
import { green, yellow } from '../assets/Images';

function Filtercard() {

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




      // const handleColorChange = (event) => {
      //   const { name, checked } = event.target.name;
      //   setSelectedColor((prevState) => ({
      //     ...prevState,
      //     [name]: checked,
      //   }));
      // };

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
        // console.log('Checked Items:', selectedPrice);

        console.log('Selected Prices:', selectedPrice);
        console.log('Selected Colors:', selectedColor);
        console.log('Selected Sizes:', selectedSize);
      };
      const clearFilters = () => {
        setSelectedColor([]); // Reset colors
        setSelectedPrice([]);//Reset price
        setSelectedSize([]) // Reset size
      };



  return (
    <div className='flex flex-col bg-white ml-8 mt-28 p-2 gap-2'>
      <div className='flex flex-row justify-between'>
      <h1 className='text-xl'>Filters:</h1>
      <button
        onClick={clearFilters}
        className="px-2 py-1 border-2 rounded hover:bg-red-600 transition">
        Clear Filters
      </button></div>


      <hr className="border-t-2 border-gray-300 my-1" />

        <form onSubmit={handleSubmit} className=''>
            <p>Price:</p>
            <div className='flex flex-col gap-2'>
      <label>
        <input
          type="checkbox"
          name="option1"
          checked={selectedPrice.option1}
          onChange={handlePriceChange}className='mr-2 h-4 w-4'
        />under ₹ 300
      </label>
    
      <label>
        <input
          type="checkbox"
          name="option2"
          checked={selectedPrice.option2}
          onChange={handlePriceChange}className='mr-2 h-4 w-4'
        />₹ 300 to ₹ 499
      </label>
      <label>
        <input
          type="checkbox"
          name="option3"
          checked={selectedPrice.option3}
          onChange={handlePriceChange}className='mr-2 h-4 w-4'
        />₹ 500 to ₹ 899

      </label> 
      <label className=''>
        <input
          type="checkbox"
          name="option4"
          checked={selectedPrice.option4}
          onChange={handlePriceChange}className='mr-2 h-4 w-4'
        />above ₹ 900
      </label></div>
      <hr className="border-t-2 border-gray-300 my-2" />

      <p>Color:</p>
      <div className='flex flex-wrap gap-2 mt-4'>
          {/* <input type='button'  name="red" className='border border-black  bg-red-500 h-10 w-10'onClick={() => handleColorChange('red')}/> */}
          <button
            type='button'
            className={`border border-black  h-8 w-8 bg-red-500 ${
              selectedColor.red ? 'border-black border-2' : 'border-1'
            }`}
            onClick={() => handleColorChange('red')}
          />
          <input type="button"  name="green" className={`border border-black h-8 w-8 bg-green-500 ${
              selectedColor.green ? 'border-black border-2' : 'border-1'
            }`} onClick={() => handleColorChange('green')}/>
          <input type="button" name="blue" className={`border border-black h-8 w-8 bg-blue-500 ${
              selectedColor.blue ? 'border-black border-2' : 'border-1'
            }`} onClick={() => handleColorChange('blue')} />
          <input type="button"  name="white" className={`border border-black h-8 w-8 bg-white ${
              selectedColor.white ? 'border-black border-2' : 'border-1'
            }`} onClick={() => handleColorChange('white')}/>
          <input type="button" name="pink" className={`border border-black h-8 w-8 bg-pink-500 ${
              selectedColor.pink ? 'border-black border-2' : 'border-1'
            }`} onClick={() => handleColorChange('pink')}/>
          <input type="button" name="brown" className={`border border-black h-8 w-8 bg-rose-800 ${
              selectedColor.brown ? 'border-black border-2' : 'border-1'
            }`} onClick={() => handleColorChange('brown')}/>
          <input type="button"  name="black"className={`border border-black h-8 w-8 bg-black ${
              selectedColor.black ? 'border-black border-2' : 'border-1'
            }`} onClick={() => handleColorChange('black')}/>
          <input type="button" name="yellow"className={`border border-black h-8 w-8 bg-yellow-500 ${
              selectedColor.yellow ? 'border-black border-2' : 'border-1'
            }`} onClick={() => handleColorChange('yellow')}/>
      </div>
      <hr className="border-t-2 border-gray-300 my-2" />

      <p>Size:</p>
      <div className='flex flex-wrap gap-2 mt-2'>
      <label>
          <input type="checkbox" name="s" checked={selectedSize.s} onChange={handleSizeChange} className='mr-2 h-4 w-4'/>S</label>
          <br />
          <label>
          <input type="checkbox" name="m" checked={selectedSize.m} onChange={handleSizeChange}className='mr-2 h-4 w-4'/>M</label><br />
          <label>
          <input type="checkbox" name="l" checked={selectedSize.l} onChange={handleSizeChange}className='mr-2 h-4 w-4'/>XL</label><br />
          <label>
          <input type="checkbox" name="xl" checked={selectedSize.xl} onChange={handleSizeChange}className='mr-2 h-4 w-4'/>XXL</label>
        </div>
        {/* <div className='justify-center items-center'> */}
      <button type="submit" className='p-2 border border-1 rounded m-4 lg:ml-20 sm:ml-6 bg-fuchsia-600 '>Apply</button>
      {/* </div> */}
    </form>

    </div>
  )
}

export default Filtercard