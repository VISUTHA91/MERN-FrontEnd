import React from 'react'
import Nav from '../Components/Nav';
import { Outlet } from 'react-router';

function RootLayout() {
  return (
    <>
    <Nav />
    <Outlet />
    
    
    </>
  )
}

export default RootLayout