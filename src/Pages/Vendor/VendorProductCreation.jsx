import React, { useState } from 'react';
import { createProduct, getCategories } from '../../api/apiServices';
import { useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";


const VendorProductCreation = () => {
    const [product, setProduct] = useState({
        name: '',
        color: '',
        variants: [{ size: "", stock: "" }],
        gender: '',
        category: '',
        subcategories: [{ name: ''}],
        MRP: '',
        offer_percentage: '',
        gst_percentage: '',
        product_details: [{ sleeve_details: '', pattern_type: '', material_type: '', fit_type: '' }],
        seller_details: [{ seller_name: '', seller_location: '' }],
        description: '',
        country_of_origin: '',
        images: [],
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories(); // Fetch categories from backend
                console.log("Fetched Data",response.data)
                setCategories(response.data); // Store fetched categories
                // setSubCategories(response.data.subcategories);
                // console.log("Fetched Data",response.data.subcategories)
                // Store fetched categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);


    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === 'images') {
            setProduct((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...Array.from(files)]  // Append new images
            }));
        }
        else if (name === "category") {
            // Fetch subcategories using the reusable function
            const subcategoryList = await fetchSubcategories(value);
            setSubCategories(subcategoryList);
          }




        else if (name in product.product_details[0]) {
            // Update product_details array
            setProduct((prevData) => ({
                ...prevData,
                product_details: [{ ...prevData.product_details[0], [name]: value }]
            }));
        }
        else if (name in product.seller_details[0]) {
            // Update product_details array
            setProduct((prevData) => ({
                ...prevData,
                seller_details: [{ ...prevData.seller_details[0], [name]: value }]
            }));
        }
        else {
            setProduct({ ...product, [name]: value });
        }
    };
    const handleColorChange = (e) => {
        setProduct({ ...product, color: e.target.value });
    };

    // Handle size and quantity changes
    const handleSizeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSizes = [...product.variants];
        updatedSizes[index] = { ...updatedSizes[index], [name]: value };
        setProduct({ ...product, variants: updatedSizes });
    };

    // Add new size field
    const addSizeField = () => {
        setProduct({
            ...product,
            variants: [...product.variants, { size: "", stock: "" }],
        });
    };

    // Remove size field
    const removeSizeField = (index) => {
        const updatedSizes = product.variants.filter((_, i) => i !== index);
        setProduct({ ...product, variants: updatedSizes });
    };

    const handleRemoveNewImage = (index) => {
        const updatedImages = product.images.filter((_, i) => i !== index);
        setProduct((prevData) => ({ ...prevData, images: updatedImages }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Before Append", product)
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('color', product.color);
        formData.append('gender', product.gender);
        formData.append('category', product.category);
        formData.append('MRP', product.MRP);
        formData.append('offer_percentage', product.offer_percentage);
        formData.append('gst_percentage', product.gst_percentage);
        formData.append('description', product.description);
        formData.append('country_of_origin', product.country_of_origin);

        // Append images (this is key for sending files)
        product.images.forEach((image, index) => {
            formData.append(`images`, image); // Add images one by one
        });

        
        if (product.variants && product.variants.length > 0) {
            product.variants.forEach((sizeData, index) => {
                formData.append(`variants[${index}][size]`, sizeData.size);
                formData.append(`variants[${index}][stock]`, sizeData.stock);
            });
        }

        if (product.product_details && product.product_details.length > 0) {
            product.product_details.forEach((details, index) => {
                Object.keys(details).forEach((key) => {
                    if (details[key]) {
                        formData.append(`product_details[${index}][${key}]`, details[key]);
                    }
                });
            });
        }


        if (product.seller_details && product.seller_details.length > 0) {
            product.seller_details.forEach((details, index) => {
                Object.keys(details).forEach((key) => {
                    if (details[key]) {
                        formData.append(`seller_details[${index}][${key}]`, details[key]);
                    }
                });
            });
        }

        try {
            await createProduct(formData);
            alert("Product Created Successfully");
        } catch (error) {
            console.error("Error creating product:", error); // Log the whole error object
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else {
                console.error("Error message:", error.message); // Log error message if no response
            }
        }
    };
    return (
        <div className=" w-full p-12 bg-white border border-2 border-gray-300 rounded-lg shadow-md mb-8 ml">
            <h2 className=" w-full text-2xl font-bold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit} className='w-full'>
                <div className='lg:flex flex gap-2'>
                    {/* Left Side Content */}
                    <div className='bg-gray-00 w-full'>
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="category">
                                Category
                            </label>
                            <select
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required>
                                <option value="" disabled>Select a category</option>
                                {categories.length > 0 ?
                                    (
                                        categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))) :
                                    (
                                        <option disabled>Loading categories...</option>
                                    )}

                            </select>
                        </div>

                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="subcategory">
                               Sub Category
                            </label>
                            <select
                                type="text"
                                name="subcategories"
                                value={product.subcategories || ""}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required>
                                <option value="" disabled>Select a  Subcategory</option>
                                {Array.isArray(subcategories) && subcategories.length > 0 ? (
                                    console.log("Subcategories",subcategories),
                                        subcategories.map((subcategory) => (
                                            <option key={subcategory._id} 
                                            value={subcategory._id}>
                                                {subcategory.name}
                                            </option>
                                        ))) :
                                    (
                                        <option disabled>Loading categories...</option>
                                    )}

                            </select>
                        </div>

                        {/* Product Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id='name'
                                value={product.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        {/* Gender */}
                        {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="gender">
                                Gender
                            </label>
                            <input
                                type="text"
                                name="gender"
                                id='gender'
                                value={product.gender}
                                onChange={handleChange}
                                className="shadow appearance-none border  w-full  py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div> */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="gender">
                                Gender
                            </label>
                            <select
                                name="gender"
                                id="gender"
                                value={product.gender}
                                onChange={handleChange}
                                className="shadow appearance-none border w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="men">Male</option>
                                <option value="women">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Color */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Color
                            </label>
                            <input
                                type="text"
                                name="color"
                                placeholder="Enter Color"
                                value={product.color}
                                onChange={handleColorChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        {/* Sizes and Quantities */}
                        <div className="mb-4">
                            {/* <label className="block text-gray-700 text-sm font-bold mb-1">
                                Sizes and Quantities
                            </label> */}
                            {product.variants.map((sizeField, index) => (
                                <div key={index} className="mb-1 flex gap-2">

                                    <div className="mb-1">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-1"
                                            htmlFor={`size-${index}`}>
                                            Size
                                        </label>
                                        <select
                                            name="size"
                                            id={`size-${index}`}
                                            value={sizeField.size || ""}
                                            onChange={(e) => handleSizeChange(index, e)}
                                            className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                            <option value="">  Size</option>
                                            <option value="XS">XS</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                    </div>


                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-1"
                                            htmlFor={`stock-${index}`}>
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            id={`stock-${index}`}
                                            placeholder="Enter Quantity"
                                            value={sizeField.stock}
                                            onChange={(e) => handleSizeChange(index, e)}
                                            className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                        />
                                    </div>


                                    {product.variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSizeField(index)}
                                            className="bg-red-500 text-white h-7 mt-7 px-1 rounded hover:bg-red-700"
                                        >
                                            <MdDeleteForever size={22} />        </button>
                                    )}
                                </div>
                            ))}


                            <button
                                type="button"
                                onClick={addSizeField}
                                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700">
                                Add Size
                            </button>
                        </div>


                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={product.description}
                                id='description'
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="4"
                            // required
                            />
                        </div>
                    </div>
                    {/* Right Side Content */}
                    <div className='bg-gray-00 w-full'>
                        {/* Matirial Type */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="material_type">
                                Material Type
                            </label>
                            <input
                                type="text"
                                name="material_type"
                                id='material_type'
                                value={product.product_details[0].material_type}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // required
                            />
                        </div>
                        {/* Fit Type */}
                        <div className="mb-4">
                            <label className="block  text-gray-700 text-sm font-bold mb-1" htmlFor="fit_type">
                                FitType
                            </label>
                            <input
                                type="text"
                                name="fit_type"
                                id='fit_type'
                                value={product.product_details[0].fit_type} onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // required
                            />
                        </div>

                        {/* Sleeve Type */}
                        <div className="mb-4">
                            <label className="block  text-gray-700 text-sm font-bold mb-1" htmlFor="sleeve_details">
                                SleeveType
                            </label>
                            <input
                                type="text"
                                name="sleeve_details"
                                id='sleeve_details'
                                value={product.product_details[0].sleeve_details} onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // required
                            />
                        </div>

                        {/* Pattern Type */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="pattern_type">
                                PatternType
                            </label>
                            <input
                                type="text"
                                name="pattern_type"
                                id='pattern_type'
                                value={product.product_details[0].pattern_type}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // required
                            />
                        </div>

                        {/* MRP Price */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="MRP">
                                MRP.Price
                            </label>
                            <input
                                type="number"
                                name="MRP"
                                id='MRP'
                                value={product.MRP}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // required
                            />
                        </div>

                            {/* Selling Price */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="MRP">
                                MRP.Price
                            </label>
                            <input
                                type="number"
                                name="MRP"
                                id='MRP'
                                value={product.MRP}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // required
                            />
                        </div>

                        {/* Offer %  */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="offer_percentage">
                                Offer Percentage
                            </label>
                            <input
                                type="number"
                                name="offer_percentage"
                                id='offer_percentage'
                                value={product.offer_percentage}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>


                        {/* GST %  */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="gst_percentage">
                                GSTin
                            </label>
                            <input
                                type="number"
                                name="gst_percentage"
                                id='gst_percentage'
                                value={product.gst_percentage}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="country_of_origin">
                                Country of Origin
                            </label>
                            <input
                                type="text"
                                name="country_of_origin"
                                id='country_of_origin'
                                value={product.country_of_origin}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // required
                            />
                        </div>

                        {/* seller Detaills */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="seller_name">
                                Seller Name
                            </label>
                            <input
                                type="text"
                                name="seller_name"
                                id='seller_name'
                                value={product.seller_details[0].seller_name}
                                onChange={handleChange}
                                className="shadow appearance-none border  w-full  py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>


                        {/* seller Location */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="seller_location">
                                Seller Location
                            </label>
                            <input
                                type="text"
                                name="seller_location"
                                id='seller_location'
                                value={product.seller_details[0].seller_location}
                                onChange={handleChange}
                                className="shadow appearance-none border  w-full  py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="images">
                        Image
                    </label>
                    <input
                        type="file"
                        name="images"
                        id='images'
                        accept="images/*"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* Preview Images */}
                {product.images.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-bold mb-1">Image Preview</h3>
                        <div className="flex  space-x-4 overflow-auto">

                            {product.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(index)} // Function to remove new image
                                        className="absolute top-0 right-0 bg-red-500 text-black p-1 rounded-full"
                                    >
                                        <MdDeleteForever size={26} />
                                    </button>
                                </div>

                            ))}
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mt-6 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default VendorProductCreation;
