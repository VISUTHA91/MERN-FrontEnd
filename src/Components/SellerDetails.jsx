import React from 'react'

function SellerDetails({name, location}) {
  return (
   <>
       <h1 className='text-lg font-bold'>Seller Details</h1>
     <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="px-1 py-1 ">Seller Name</td>
            <td className="px-1 py-1 ">{name}</td>
          </tr>
          <tr>
            <td className="px-1 py-1">Location</td>
            <td className="px-1 py-1">{location}</td>
          </tr>
        </tbody>
      </table>
   </>
  )
}

export default SellerDetails