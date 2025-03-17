import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewModal from '../../Components/ReviewModal';
import {useEffect} from "react";
import { API_BASE_URL, getOrdersByUser } from "../../api/apiServices";
import GoBackButton from "../../Components/GoBackButton";
import { submitReview } from "../../api/apiServices";
import { TfiHeadphoneAlt } from "react-icons/tfi";
const UserOrder = () => {
  const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = JSON.parse(localStorage.getItem('userData'));
        const fetchedOrders = await getOrdersByUser(userId.id);
        setOrders(fetchedOrders);
        console.log(fetchedOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders. Please try again.');
        setLoading(false);
      }
    };
    fetchOrders();
  },[]);

  console.log("ORDERS",orders);
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

const OrderCard = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [ratings, setRatings] = useState({}); // Store ratings per product
  const [reviews, setReviews] = useState({}); // Store reviews per product
  const [hover, setHover] = useState({}); // Store hover state per product
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ratedProducts, setRatedProducts] = useState({}); // Track rated products
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("Orders Page",order)

  const handleSubmit = async () => {
    const rating = ratings[selectedProductId];
    const reviewText = reviews[selectedProductId];
    const orderId = order.razorpayOrderId; // Assuming the order ID is available here
    const productId = selectedProductId;
    console.log("Review Submitted:", { rating, reviewText });
    try {
      const response = await submitReview(orderId, productId, rating, reviewText);
      console.log('Review submitted successfully:', response);
      setRatedProducts((prev) => ({
        ...prev,
        [selectedProductId]: true,
      }));
      // setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  // const handleStarClick = (productId, rating,) => {
  //   setSelectedProductId(productId); // Set selected product
  //   setRatings((prev) => ({
  //     ...prev,
  //     [productId]: rating, // Store rating for this specific product
  //   }));
  //   setIsModalOpen(true);
  // };
 
  const handleStarClick = (productId, rating) => {
    console.log("Ratings:",rating)
    console.log("ProductID:",productId)
    setSelectedProduct({ productId, rating });
    setIsModalOpen(true);
    // setRatings((prevRatings) => ({
    //   ...prevRatings,
    //   [productId]: rating, // Store rating per product
    // }));
  };
  console.log("Selected Product",selectedProduct);

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
      <div className="mt-4" >
        {Array.isArray(order.products) && order.products.length > 0 ? (
          order.products.map((product) => (
          <div key={product.productId}
          className="border flex flex-col sm:flex-row items-center sm:items-start p-4 rounded-lg mb-4 gap-6 relative"
        >
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
                    className={`cursor-pointer text-xl mt-1
                       ${   currentRating <= (hover[product.productId] || ratings[product.productId] || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(product.productId, currentRating)}
                    onMouseEnter={() => setHover((prev) => ({ ...prev, [product.productId]: currentRating }))}
                    onMouseLeave={() => setHover((prev) => ({ ...prev, [product.productId]: null }))}
                  />
                );
              })}
            </div>
          </div>
          <TfiHeadphoneAlt
            className="absolute top-2 right-2 text-gray-500 hover:text-blue-500 cursor-pointer text-xl"
            onClick={() => {
              setSelectedProduct(product);
              setIsHelpModalOpen(true); 
            }}
          />
        </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No Products In This Order....</p>
        )}
      </div>
      {/* Rating Modal */}
      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          rating={ratings[selectedProduct] || 0}
          reviewText={reviews[selectedProduct] || ""}
          setReviewText={(text) =>
            setReviews((prev) => ({ ...prev, [selectedProduct]: text }))
          }
          onSubmit={handleSubmit}
        />
      )}
    <SupportModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} product={selectedProduct} />
    </div>
  );
};

const SupportModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const emailSubject = encodeURIComponent("Support Request for a Product");
  // const emailBody = encodeURIComponent(
  //   `Hello,\n\nI need help with the following product:\n\n` +
  //   `Product Name: ${product.name}\n` +
  //   `Product ID: ${product.productId || "N/A"}\n` +
  //   `Vendor ID: ${product.productDetails.vendor_id || "N/A"}\n\n` +
  //   `Please assist me with my query.\n\nThank you.`
  // );
  const emailBody = encodeURIComponent(
    `Hello,\n\n` +
    `I need assistance with the following product:\n\n` +
    `📌 *Product Name:* ${product.name}\n` +
    `📌 *Product ID:* ${product.productId || "N/A"}\n` +
    `📌 *Vendor ID:* ${product.productDetails.vendor_id || "N/A"}\n\n` +
    `Could you please help me with my query regarding this product?\n\n` +
    `Looking forward to your response.\n\n` +
    `Best regards,\n[Your Name]`
  );
  
  const emailLink = `mailto:admin@mail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose} // Close modal on background click
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-2xl w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">Support Us</h2>
          <button
            className="text-gray-500 hover:text-red-500 transition duration-200"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <button
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300"
            onClick={() => window.location.href = emailLink}
          >
            📧 Email Support
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 p-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md transition duration-300"
            onClick={() => window.open("https://wa.me/1234567890", "_blank")}
          >
            💬 WhatsApp Chat
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserOrder;


//     <div className="bg-white rounded-lg shadow-md p-4 bg-red-200 w-58">
//       <h2 className="text-lg font-semibold text-gray-800">Order ID: {order.razorpayOrderId}</h2>
//       <p className="text-gray-600">Delivery Date: {order.deliveryDate}</p>
//       <span
//         className={`px-2 py-1 rounded-full text-white inline-block my-2 ${
//           order.orderStatus === "Delivered"
//             ? "bg-green-500"
//             : order.orderStatus === "Shipped"
//             ? "bg-blue-500"
//             : "bg-yellow-500"
//         }`}
//       >
//         {order.orderStatus}
//       </span>
// <div className="mt-4">
//   {Array.isArray(order.products) && order.products.length > 0 ? (
//     order.products.map((product) => (
//       <div key={product.id} className="border flex justify-between p-2 rounded-lg mb-2 gap-4">
//         <img
//           src={`${API_BASE_URL}${product.productId.images}`}
//           alt={product.name}
//           className="w-1/3 h-32 object-cover rounded-md"
//         />
//         <div className="w-2/3">
//         <h3 className="text-md font-semibold mt-2">{product.name}</h3>
//         <p className="text-gray-600">Price: ₹{product.price?.toFixed(2)}</p>
//         <p className="text-gray-600">Qty: {product.quantity}</p>
//         <div className="flex mt-2" >Give Ratings: 
//           {[...Array(5)].map((_, index) => {
//             const currentRating = index + 1;
//             return ( 
//               <FaStar 
//                 key={index}
//                 className={`cursor-pointer text-xl ${
//                   currentRating <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
//                 }`}
//                 onClick={() => {
//                   setRating(currentRating);
//                   setIsModalOpen(true);
//                 }}
//                 onMouseEnter={() => setHover(currentRating)}
//                 onMouseLeave={() => setHover(null)}
//               />
//             );
//           })}
//         </div>
//       </div>
//       </div>
//     ))
//   ) : (
//     <p className="text-gray-600">No products in this order.</p>
//   )}
// </div>
// </div>

//  <div className="bg-white rounded-lg shadow-md p-6 bg-red-200 min-w-[320px] max-w-4xl">
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
//     {ratedProducts[product.id] ? "You Rated" : "Rate This Product:"}
//   </span>
//                   {[...Array(5)].map((_, index) => {
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
//                           setRating(currentRating);
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
      
//     {/* Rating Modal */}
//     <ReviewModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         rating={rating}
//         reviewText={reviewText}
//         setReviewText={setReviewText}
//         onSubmit={handleSubmit}
//       />
//     </div>

