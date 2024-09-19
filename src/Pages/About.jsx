import React from 'react';
import { aboutstore } from '../assets/Images';

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 mt-16 text-center">About Us</h1>
      
      <section className="mb-8">
  
         <div className="mb-6">
          <img
            src={aboutstore}
            alt="About Us"
            // className="w-full h-auto object-cover rounded-lg shadow-lg"
            className="w-3/4 h-auto object-cover rounded-lg shadow-lg mx-auto"
            style={{ maxWidth: '400px' }}
          />
        </div>
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to <span className="font-semibold">Evvi Tees</span>, where fashion meets passion. Founded in 2024, our journey began with a simple vision: to provide stylish, high-quality clothing that empowers individuals to express their unique personalities.
        </p>
        <p className="text-lg leading-relaxed">
          Inspired by the latest trends and timeless classics, we carefully curate our collections to offer a blend of comfort, elegance, and affordability. Our team is dedicated to bringing you the best in fashion, whether you're dressing up for a special occasion or keeping it casual.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed mb-4">
          At <span className="font-semibold">Evvi Tees</span>, our mission is to make fashion accessible to everyone. We believe that everyone deserves to feel confident and stylish without breaking the bank. Our goal is to create a shopping experience that is as enjoyable and seamless as possible, from browsing our collection to receiving your order at your doorstep.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
        <p className="text-lg leading-relaxed mb-4">
          We invite you to explore our collection and discover the perfect pieces that reflect your style. Follow us on social media for the latest updates, fashion tips, and exclusive offers.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for being a part of the <span className="font-semibold">Evvi</span> family. We look forward to serving you!
        </p>
      </section>
    </div>
  );
};

export default About;
