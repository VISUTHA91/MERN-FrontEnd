// import React, { useState } from 'react';

// const ZoomImage = ({imgSrc}) => {
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

//   const handleMouseEnter = () => {
//     setIsZoomed(true);
//   };

//   const handleMouseLeave = () => {
//     setIsZoomed(false);
//   };

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   return (
//     <div
//       className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseMove={handleMouseMove}
//     >
//       <img
//         src={imgSrc}
//         alt="Product Image"
//         className="w-full h-full object-cover"
//       />
//       {isZoomed && (
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
//           style={{
//             backgroundImage: `url(${imgSrc})`,
//             backgroundSize: '200%',
//             backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//             pointerEvents: 'none',
//           }}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default ZoomImage;


import React, { useState } from 'react';

const ZoomImage = ({ imgSrc }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Enable zoom effect on mouse enter
  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  // Disable zoom effect on mouse leave
  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  // Calculate the zoom position based on mouse movement
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div
      className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ overflow: 'hidden' }} // Prevents zoomed-out image from spilling over the container
    >
      <img
        src={imgSrc}
        alt="Product Image"
        className="w-full h-full object-cover"
        style={{ transition: 'transform 0.3s ease' }} // Optional: smooth transition effect on image scaling
      />
      {isZoomed && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: '200%', // Zoom effect size (increase this if you want more zoom)
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`, // Adjust the background position
            pointerEvents: 'none',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

export default ZoomImage;
