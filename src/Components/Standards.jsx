// import React from "react";
// import { exchange, payment1, support, EasyReturns,Shipping,paymentsecure,OnlineSupport, TopQuality } from "../assets/Images";
// import { price } from "../assets/Images";

// function Standards(){
//     return(
//         <>
//             <div className=" flex  flex-row w-full bg-gray-100 h-48 justify-around items-center">
//                 <div className="flex flex-col justify-center items-center">
//                     <img src={EasyReturns} ></img>
//                     <p>Easy Exchange</p>
//                 </div>
//                 <div className="flex flex-col justify-center items-center">
//                     <img src={paymentsecure}></img>
//                     <p>Secure Payment</p>
//                 </div>
//                 <div className="flex flex-col justify-center items-center">
//                     <img src={Shipping} ></img>
//                     <p>Budget-friendly</p>
//                 </div>
//                 {/* <div className="flex flex-col justify-center items-center">
//                     <img src={TopQuality} className="size-12" ></img>
//                     <p>Top Quality</p>
//                 </div> */}
//                 <div className="flex flex-col justify-center items-center">
//                     <img src={OnlineSupport} ></img>
//                     <p >24/7 Support </p>
//                 </div>
//             </div>       
//         </>
//     )
// }
// export  default Standards;
import React from "react";
import { exchange, payment1, support, EasyReturns, Shipping, paymentsecure, OnlineSupport, TopQuality } from "../assets/Images";

function Standards() {
    return (
        <div className="flex flex-wrap w-full bg-gray-100 py-8 justify-around items-center">
            <div className="flex flex-col justify-center items-center w-1/2 md:w-1/4 lg:w-1/5 mb-4">
                <img src={EasyReturns} alt="Easy Exchange" className="w-18 md:w-18 h-auto object-contain" />
                <p className="text-center text-sm md:text-base mt-2">Easy Exchange</p>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 md:w-1/4 lg:w-1/5 mb-4">
                <img src={paymentsecure} alt="Secure Payment" className="w-18 md:w-18 h-auto object-contain" />
                <p className="text-center text-sm md:text-base mt-2">Secure Payment</p>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 md:w-1/4 lg:w-1/5 mb-4">
                <img src={Shipping} alt="Budget-friendly" className="w-18 md:w-18 h-auto object-contain" />
                <p className="text-center text-sm md:text-base mt-2">Budget-friendly</p>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 md:w-1/4 lg:w-1/5 mb-4">
                <img src={OnlineSupport} alt="24/7 Support" className="w-18 md:w-18 h-auto object-contain" />
                <p className="text-center text-sm md:text-base mt-2">24/7 Support</p>
            </div>
        </div>
    );
    
}

export default Standards;
