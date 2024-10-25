import React from 'react'

function ProductDescription( {material_type, sleeve_details, fit_type, pattern_type} ) {
  return (
    <>
    <h1 className='text-lg font-bold'>Product Details</h1>
    <table className="table-auto w-full">
  <tbody>
    <tr>
      <td className="px-1 py-1">
        Material Composition
      </td>
      <td className="px-1 py-1">
        {material_type}
      </td>
    </tr>
    <tr>
      <td className="px-1 py-1">
        Pattern
      </td>
      <td className="px-1 py-1">
        {pattern_type}
      </td>
    </tr>
    <tr>
      <td className="px-1 py-1">
        Fit Type
      </td>
      <td className="px-1 py-1">
        {fit_type} Fit
      </td>
    </tr>
    <tr>
      <td className="px-1 py-1">
        Sleeve Type
      </td>
      <td className="px-1 py-1">
        {sleeve_details}
      </td>
    </tr>
  </tbody>
</table>


    
    
    
    </>
  )
}

export default ProductDescription