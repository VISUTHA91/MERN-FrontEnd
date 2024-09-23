import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useState } from 'react';

const Contact = () => {
  // const mapContainerStyle = {
  //   height: "400px",
  //   width: "100%",
  // };

  // const center = {
  //   lat: 40.748817,
  //   lng: -73.985428 
  // };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    console.log('Form Data:', formData);


  //   try {
  //     const response = await axios.post('http://localhost:5000/send-email', formData);
  //     if (response.data.success) {
  //       setSent(true);
  //       setError(null);
  //     } else {
  //       throw new Error(response.data.message);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     setSent(false);
  //   } finally {
  //     setSending(false);
  //   }
   };

  return (
    <div className="container mx-auto p-6 w-full  bg-blue ">
      <h1 className="text-3xl font-bold mb-6 mt-16">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2   ">
        <div className='bg-rose p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded'>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <form className="space-y-4"onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Message"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-10 py-2 ml-36 rounded hover:bg-blue-600 "
            >
              Send
            </button>
          </form>
        </div>

        {/* Map */}
        <div className='w-full p-2 border shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded'>
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>
          {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
            />
          </LoadScript> */}

          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.5734490429422!2d78.07370330860071!3d9.886107374947407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cf74c1a67a85%3A0xb73a29d5ae1c79e4!2sEvvi%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1724252060927!5m2!1sen!2sin"
          className="h-[390px] w-full lg:pr-"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
