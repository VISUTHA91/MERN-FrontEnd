import React from 'react'
import ShopbyCategory from '../Components/ShopbyCategory'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import ShopbyPrice from '../Components/ShopbyPrice';
import ShopbyGender from '../Components/ShopbyGender';
import ShopCategory from '../Components/ShopCategory';

function Catogory() {
  return (
    <Grid className='lg:flex-row sm:flex-col'>
        <div><ShopbyCategory /></div>
       <div> <ShopbyGender /></div>
       <div><ShopbyPrice /></div>
       {/* <div><ShopCategory /></div>     */}

    </Grid>

  )
}

export default Catogory