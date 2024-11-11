import React from "react";
import { exchange, payment1, support, EasyReturns,Shipping,paymentsecure,OnlineSupport, TopQuality } from "../assets/Images";
// import { payment1, quality } from "../assets/Images";
import { price } from "../assets/Images";



function Standards(){
    return(
        <>
            <div className=" flex  flex-row w-full bg-gray-100 h-48 justify-around items-center">
                <div className="flex flex-col justify-center items-center">
                    <img src={EasyReturns} ></img>
                    <p>Easy Exchange</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src={paymentsecure}></img>
                    <p>Secure Payment</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src={Shipping} ></img>
                    <p>Budget-friendly</p>
                </div>
                {/* <div className="flex flex-col justify-center items-center">
                    <img src={TopQuality} className="size-12" ></img>
                    <p>Top Quality</p>
                </div> */}
                <div className="flex flex-col justify-center items-center">
                    <img src={OnlineSupport} ></img>
                    <p >24/7 Support </p>
                </div>
            </div>
        
        
        
        </>






    )
}
export  default Standards;
