import { useState } from "react";
import { FaStar, FaRegComment, FaHeart } from "react-icons/fa";

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: "Towhidur Rahman",
      totalSpend: 200,
      totalReview: 14,
      date: "24-10-2022",
      rating: 4,
      review:
        "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Towhidur Rahman",
      totalSpend: 200,
      totalReview: 14,
      date: "24-10-2022",
      rating: 3,
      review:
        "My first and only mala ordered on Etsy, and I'm beyond delighted! The fun and genuine joy.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <h2 className="text-3xl font-semibold mb-4">Reviews</h2>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">Total Reviews</p>
          <p className="text-2xl font-semibold">10.0k <span className="text-green-500 text-sm">⬆ 21%</span></p>
        </div>
        <div>
          <p className="text-gray-600">Average Rating</p>
          <p className="text-2xl font-semibold flex items-center">
            4.0 <FaStar className="text-yellow-500 ml-1" />
          </p>
        </div>
        <div>
          <p className="text-gray-600">Rating Breakdown</p>
          <div className="space-y-1">
            <p className="flex items-center"><FaStar className="text-yellow-500 mr-1" /> 5 ⭐ - 2.0k</p>
            <p className="flex items-center"><FaStar className="text-yellow-500 mr-1" /> 4 ⭐ - 1.0k</p>
            <p className="flex items-center"><FaStar className="text-yellow-500 mr-1" /> 3 ⭐ - 500</p>
            <p className="flex items-center"><FaStar className="text-yellow-500 mr-1" /> 2 ⭐ - 200</p>
            <p className="flex items-center"><FaStar className="text-yellow-500 mr-1" /> 1 ⭐ - 0</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-md flex gap-4">
            <img src={review.avatar} alt="User Avatar" className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-600">Total Spend: <span className="font-semibold">${review.totalSpend}</span></p>
              <p className="text-sm text-gray-600">Total Reviews: <span className="font-semibold">{review.totalReview}</span></p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`mr-1 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`} />
                ))}
                <span className="ml-2 text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 mt-2">{review.review}</p>
              <div className="flex gap-4 mt-4">
                <button className="flex items-center px-3 py-1.5 border rounded-md text-gray-700 hover:bg-gray-200">
                  <FaRegComment className="mr-2" /> Public Comment
                </button>
                <button className="flex items-center px-3 py-1.5 border rounded-md text-gray-700 hover:bg-gray-200">
                  <FaHeart className="mr-2 text-red-500" /> Direct Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
