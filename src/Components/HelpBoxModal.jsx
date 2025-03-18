import React from "react";

const HelpBoxModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const phoneNumber = "1234567890"; // Replace with actual number
    const email = "support@example.com"; // Replace with actual email
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">Choose how you'd like to contact us:</p>
  
          {/* Message Button */}
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-2"
            onClick={() => window.open(`sms:${phoneNumber}`, "_self")}
          >
            Send via Message
          </button>
  
          {/* Email Button */}
          <button
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => window.open(`mailto:${email}`, "_self")}
          >
            Send via Email
          </button>
  
          {/* Close Button */}
          <button
            className="w-full mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  export default HelpBoxModal;