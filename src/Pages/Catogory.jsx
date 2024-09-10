import React from 'react'
import ShopbyCategory from '../Components/ShopbyCategory'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import ShopbyPrice from '../Components/ShopbyPrice';
import ShopbyGender from '../Components/ShopbyGender';

function Catogory() {
  return (
    <Grid className='lg:flex-row sm:flex-col'>
        <div><ShopbyCategory /></div>


       <div> <ShopbyGender /></div>
       <div><ShopbyPrice /></div>

    </Grid>
//     <Box sx={{ flexGrow: 1, p: 2 }}>
//     <Grid container spacing={2}>
//       <Grid item xs={12} sm={6} md={4}>
//         <ShopbyPrice />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <ShopbyCategory />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <ShopbyGender />
//       </Grid>
//     </Grid>
//   </Box>
  )
}

export default Catogory