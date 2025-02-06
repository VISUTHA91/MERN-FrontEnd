// import { Modal } from "react-responsive-modal";
// import "react-responsive-modal/styles.css";
import React from "react";

const ReviewModal = ({ isOpen, onClose, rating, reviewText, setReviewText, onSubmit }) => {
  return (
    // <Modal open={isOpen} onClose={onClose} center>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full ">
        <h2 className="text-xl font-bold mb-4">Rate This Product</h2>
        <p className="text-gray-600 mb-2">Selected Rating: {rating} Stars</p>
        <textarea
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Tell us more about your experience..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      </div>
    // </Modal>
  );
};

export default ReviewModal;
