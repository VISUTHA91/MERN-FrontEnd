import React from "react";
import { exchange, payment1, support } from "../assets/Images";
// import { payment1, quality } from "../assets/Images";
import { price } from "../assets/Images";



function Standards(){
    return(
        <>
            <div className=" flex  flex-row w-full bg-gray-100 h-48 justify-around items-center">
                <div className="flex flex-col">
                    <img src={exchange} className="size-24"></img>
                    <p>Easy Exchange</p>
                </div>
                <div className="flex flex-col">
                    <img src={payment1} className="size-24"></img>
                    <p>Secure Payment</p>
                </div>
                <div className="flex flex-col">
                    <img src={price} className="size-24"></img>
                    <p>Budget-friendly</p>
                </div>
                <div className="flex flex-col">
                    <img src={support} className="size-24" ></img>
                    <p>24/7 Support </p>
                </div>
            </div>
        
        
        
        </>






    )
}
export  default Standards;
