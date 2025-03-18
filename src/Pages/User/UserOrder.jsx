
import { useState, useEffect } from "react";
import { FaStar,FaInfoCircle } from "react-icons/fa";
import ReviewModal from "../../Components/ReviewModal";
import GoBackButton from "../../Components/GoBackButton";
import { submitReview } from "../../api/apiServices";
import {getOrdersByUser} from '../../api/apiServices';
import { API_BASE_URL } from '../../api/apiServices';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import  HelpBoxModal  from '../../Components/HelpBoxModal';



const UserOrder = () => {
  const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData.id) {
          throw new Error("User not found");
        }
        const fetchedOrders = await getOrdersByUser(userData.id);
        setOrders(fetchedOrders.data);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  },[]);
    return (
      <div className="bg-gray-100 min-h-screen grid p-6">
    <div className="absolute top-2 mt-28 left-2">
        <GoBackButton />
      </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-14">My Orders</h1>
    
        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    );
};

// const OrderCard = ({ order }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ratings, setRatings] = useState({}); // Store ratings per product

//   const [rating, setRating] = useState({});
//   const [reviews, setReviews] = useState({}); // Store reviews per product
//   const [hover, setHover] = useState(null);
//   const [reviewText, setReviewText] = useState("");
//   const [ratedProducts, setRatedProducts] = useState({}); // Track rated products
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const handleSubmit = () => {
//     console.log("Review Submitted:", { rating, reviewText });
//     setReviews((prev) => ({ ...prev, [selectedProductId]: reviewText })); // Save per-product review
//     setRatedProducts((prev) => ({
//       ...prev,
//       [selectedProductId]: true, // Mark the product as rated
//     }));   
//     setIsModalOpen(false);
//   };
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 bg-red-200 min-w-[320px] max-w-4xl">
//       <h2 className="text-lg font-semibold text-gray-800">
//         Order ID: {order.razorpayOrderId}
//       </h2>
//       <p className="text-gray-600">Delivery Date: {order.deliveryDate}</p>
//       <span
//         className={`px-3 py-1 rounded-full text-white inline-block my-2 text-sm sm:text-base ${
//           order.orderStatus === "Delivered"
//             ? "bg-green-500"
//             : order.orderStatus === "Shipped"
//             ? "bg-blue-500"
//             : "bg-yellow-500"
//         }`}
//       >
//         {order.orderStatus}
//       </span>
//       <div className="mt-4">
//         {Array.isArray(order.products) && order.products.length > 0 ? (
//           order.products.map((product) => (
//             <div
//               key={product.id}
//               className="border flex flex-col sm:flex-row items-center sm:items-start p-4 rounded-lg mb-4 gap-6"
//             >
//               <img
//                 src={`${API_BASE_URL}${product.productId.images}`}
//                 alt={product.name}
//                 className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-md"
//               />
//               <div className="w-full sm:w-2/3 text-center sm:text-left">
//                 <h3 className="text-md font-semibold mt-2">{product.name}</h3>
//                 <p className="text-gray-600">Price: ₹{product.price?.toFixed(2)}</p>
//                 <p className="text-gray-600">Qty: {product.quantity}</p>
//                 <div className="flex justify-center sm:justify-start mt-2">
//                   <span className="mr-2">
//                     {ratedProducts[product.id] ? "You Rated" : "Rate This Product:"}
//                   </span>
//                  {[...Array(5)].map((_, index) => {
//                     const currentRating = index + 1;
//                     return (
//                       <FaStar
//                         key={index}
//                         className={`cursor-pointer text-xl ${
//                           currentRating <= (hover || rating)
//                             ? "text-yellow-500"
//                             : "text-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedProductId(product.id); // Set selected product
//                           setRatings((prev) => ({ ...prev, [product.id]: currentRating })); // Store per-product rating
//                           setIsModalOpen(true);
//                         }}
//                         onMouseEnter={() => setHover(currentRating)}
//                         onMouseLeave={() => setHover(null)}
//                       />
//                     );
//                   })} 
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600 text-center">No products in this order.</p>
//         )}
//       </div>
//       {/* Rating Modal */}
//       {isModalOpen && selectedProductId && (
//   <ReviewModal
//     isOpen={isModalOpen}
//     onClose={() => setIsModalOpen(false)}
//     rating={ratings[selectedProductId] || 0}
//     reviewText={reviews[selectedProductId] || ""}
//     setReviewText={(text) =>
//       setReviews((prev) => ({ ...prev, [selectedProductId]: text }))
//     }
//     onSubmit={handleSubmit}
//   />
// )}
//     </div>
//   );
// };
// const OrderCard = ({ order }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ratings, setRatings] = useState({}); // Store ratings per product
//   const [reviews, setReviews] = useState({}); // Store reviews per product
//   const [hover, setHover] = useState(null);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [ratedProducts, setRatedProducts] = useState({}); // Track rated products

//   const handleSubmit = () => {
//     console.log("Review Submitted:", {
//       rating: ratings[selectedProductId],
//       reviewText: reviews[selectedProductId],
//     });

//     setRatedProducts((prev) => ({
//       ...prev,
//       [selectedProductId]: true, // Mark product as rated
//     }));

//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 bg-red-200 min-w-[320px] max-w-4xl">
//       <h2 className="text-lg font-semibold text-gray-800">
//         Order ID: {order.razorpayOrderId}
//       </h2>
//       <p className="text-gray-600">Delivery Date: {order.deliveryDate}</p>
//       <span
//         className={`px-3 py-1 rounded-full text-white inline-block my-2 text-sm sm:text-base ${
//           order.orderStatus === "Delivered"
//             ? "bg-green-500"
//             : order.orderStatus === "Shipped"
//             ? "bg-blue-500"
//             : "bg-yellow-500"
//         }`}
//       >
//         {order.orderStatus}
//       </span>
//       <div className="mt-4">
//         {Array.isArray(order.products) && order.products.length > 0 ? (
//           order.products.map((product) => (
//             <div
//               key={product.id}
//               className="border flex flex-col sm:flex-row items-center sm:items-start p-4 rounded-lg mb-4 gap-6"
//             >
//               <img
//                 src={`${API_BASE_URL}${product.productId.images}`}
//                 alt={product.name}
//                 className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-md"
//               />
//               <div className="w-full sm:w-2/3 text-center sm:text-left">
//                 <h3 className="text-md font-semibold mt-2">{product.name}</h3>
//                 <p className="text-gray-600">Price: ₹{product.price?.toFixed(2)}</p>
//                 <p className="text-gray-600">Qty: {product.quantity}</p>
//                 <div className="flex justify-center sm:justify-start mt-2">
//                   <span className="mr-2">
//                     {ratedProducts[product.id] ? "You Rated" : "Rate This Product:"}
//                   </span>
//                   {[...Array(5)].map((_, index) => {
//                     const currentRating = index + 1;
//                     return (
//                       <FaStar
//                         key={index}
//                         className={`cursor-pointer text-xl ${
//                           currentRating <= (hover || ratings[product.id] || 0)
//                             ? "text-yellow-500"
//                             : "text-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedProductId(product.id); // Set selected product
//                           setRatings((prev) => ({ ...prev, [product.id]: currentRating })); // Store per-product rating
//                           setIsModalOpen(true);
//                         }}
//                         onMouseEnter={() => setHover(currentRating)}
//                         onMouseLeave={() => setHover(null)}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600 text-center">No products in this order.</p>
//         )}
//       </div>

//       {/* Rating Modal */}
//       {isModalOpen && selectedProductId && (
//         <ReviewModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           rating={ratings[selectedProductId] || 0}
//           reviewText={reviews[selectedProductId] || ""}
//           setReviewText={(text) =>
//             setReviews((prev) => ({ ...prev, [selectedProductId]: text }))
//           }
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// };

// const OrderCard = ({ order }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ratings, setRatings] = useState({}); // Store ratings per product
//   const [reviews, setReviews] = useState({}); // Store reviews per product
//   const [hover, setHover] = useState(null);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [ratedProducts, setRatedProducts] = useState({}); // Track rated products

//   const handleSubmit = () => {
//     console.log("Review Submitted:", {
//       rating: ratings[selectedProductId],
//       reviewText: reviews[selectedProductId],
//     });

//     setRatedProducts((prev) => ({
//       ...prev,
//       [selectedProductId]: true, // Mark product as rated
//     }));

//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 bg-red-200 min-w-[320px] max-w-4xl">
//       <h2 className="text-lg font-semibold text-gray-800">
//         Order ID: {order.razorpayOrderId}
//       </h2>
//       <p className="text-gray-600">Delivery Date: {order.deliveryDate}</p>
//       <span
//         className={`px-3 py-1 rounded-full text-white inline-block my-2 text-sm sm:text-base ${
//           order.orderStatus === "Delivered"
//             ? "bg-green-500"
//             : order.orderStatus === "Shipped"
//             ? "bg-blue-500"
//             : "bg-yellow-500"
//         }`}
//       >
//         {order.orderStatus}
//       </span>

//       <div className="mt-4">
//         {Array.isArray(order.products) && order.products.length > 0 ? (
//           order.products.map((product) => (
//             <div
//               key={product.id}
//               className="border flex flex-col sm:flex-row items-center sm:items-start p-4 rounded-lg mb-4 gap-6"
//             >
//               <img
//                 src={`${API_BASE_URL}${product.productId.images}`}
//                 alt={product.name}
//                 className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-md"
//               />
//               <div className="w-full sm:w-2/3 text-center sm:text-left">
//                 <h3 className="text-md font-semibold mt-2">{product.name}</h3>
//                 <p className="text-gray-600">Price: ₹{product.price?.toFixed(2)}</p>
//                 <p className="text-gray-600">Qty: {product.quantity}</p>
//                 <div className="flex justify-center sm:justify-start mt-2">
//                   <span className="mr-2">
//                     {ratedProducts[product.id] ? "You Rated" : "Rate This Product:"}
//                   </span>
//                   {[...Array(5)].map((_, index) => {
//                     const currentRating = index + 1;
//                     return (
//                       <FaStar
//                         key={index}
//                         className={`cursor-pointer text-xl ${
//                           currentRating <= (hover || ratings[product.id] || 0)
//                             ? "text-yellow-500"
//                             : "text-gray-300"
//                         }`}
//                         onClick={() => {
//                           setSelectedProductId(product.id); // Set selected product
//                           setRatings((prev) => ({
//                             ...prev,
//                             [product.id]: currentRating, // Store rating for this specific product
//                           }));
//                           setIsModalOpen(true);
//                         }}
//                         onMouseEnter={() => setHover(currentRating)}
//                         onMouseLeave={() => setHover(null)}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600 text-center">No products in this order.</p>
//         )}
//       </div>

//       {/* Rating Modal */}
//       {isModalOpen && selectedProductId && (
//         <ReviewModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           rating={ratings[selectedProductId] || 0}
//           reviewText={reviews[selectedProductId] || ""}
//           setReviewText={(text) =>
//             setReviews((prev) => ({ ...prev, [selectedProductId]: text }))
//           }
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// };

const OrderCard = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratings, setRatings] = useState({}); // Store ratings per product
  const [reviews, setReviews] = useState({}); // Store reviews per product
  const [hover, setHover] = useState({}); // Store hover state per product
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ratedProducts, setRatedProducts] = useState({}); // Track rated products
   const [ isHelpModalOpen, setIsHelpModalOpen ] = useState(false);


 

  const handleSubmit = async () => {
    const rating = ratings[selectedProductId];
    const reviewText = reviews[selectedProductId];
    const orderId = order.razorpayOrderId; // Assuming the order ID is available here
    const productId = selectedProductId;
    console.log("Review Submitted:", { rating, reviewText });

    try {
      // Submit review to the backend
      const response = await submitReview(orderId, productId, rating, reviewText);
      console.log('Review submitted successfully:', response);
      // Mark the product as rated
      setRatedProducts((prev) => ({
        ...prev,
        [selectedProductId]: true,
      }));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error (e.g., show a message to the user)
    }
  };
  const handleStarClick = (productId, rating,) => {
    // setSelectedProductId(productId); // Set selected product
    setSelectedProductId(productId);
    // setIsModalOpen(true);
    setRatings((prev) => ({
      ...prev,
      [productId]: rating, // Store rating for this specific product
    }));
    setIsModalOpen(true);
  };
  const handleReturn = (productId) => {
    console.log(`Returning product with ID: ${productId}`);
    // Add your return logic here (e.g., API call)
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 bg-red-200 min-w-[320px] max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800">
        Order ID: {order.razorpayOrderId}
      </h2>
      <p className="text-gray-600">Delivery Date: {order.deliveryDate}</p>
      <span
        className={`px-3 py-1 rounded-full text-white inline-block my-2 text-sm sm:text-base ${
          order.status === "Delivered"
            ? "bg-green-500"
            : order.status === "Shipped"
            ? "bg-blue-500"
            : "bg-yellow-500"
        }`}
      >
        {order.status}
      </span>
      <div className="mt-4">
        {Array.isArray(order.products) && order.products.length > 0 ? (
          order.products.map((product) => (
            <div
              key={product.productId._id}
              className="relative border flex flex-col sm:flex-row items-center sm:items-start p-4 rounded-lg mb-4 gap-6 "
            >
              
              <TfiHeadphoneAlt 
    className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-blue-500"
    title="Click on stars to rate this product"
    onClick={() => setIsHelpModalOpen(true)}
  />


              <img
                src={`${API_BASE_URL}${product.productDetails.images[0]}`}
                alt={product.name}
                className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-md"
              />
              <div className="w-full sm:w-2/3 text-center sm:text-left">
                <h3 className="text-md font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600">Price: ₹{product.price?.toFixed(2)}</p>
                <p className="text-gray-600">Qty: {product.quantity}</p>
                <div className="flex justify-center sm:justify-start mt-2">
                  <span className="mr-2">
                    {ratedProducts[product.productId] ? "You Rated" : "Rate This Product:"}
                  </span>
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <FaStar
                        key={index}
                        className={`cursor-pointer text-xl ${
                          currentRating <= (hover[product.productId] || ratings[product.productId] || 0)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleStarClick(product.productId, currentRating)}
                        onMouseEnter={() => setHover((prev) => ({ ...prev, [product.productId._id]: currentRating }))}
                        onMouseLeave={() => setHover((prev) => ({ ...prev, [product.productId._id]: null }))}
                      />
                    );
                  })}
                </div><button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              onClick={() => handleReturn(product.productId)}
            >
              Return
            </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No products in this order.</p>
        )}
      </div>

      {/* Rating Modal */}
      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // rating={ratings}  // ✅ Pass correct rating
          rating={ratings[selectedProductId] || 0}
          reviewText={reviews[selectedProductId] || ""}
          setReviewText={(text) =>
            setReviews((prev) => ({ ...prev, [selectedProductId]: text }))
          }
          onSubmit={handleSubmit}
        />
      )}
{isHelpModalOpen && (
<HelpBoxModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
)}
    </div>
  );
};
export default UserOrder;