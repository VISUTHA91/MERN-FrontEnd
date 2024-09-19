import React from 'react'
import Nav from '../Components/Nav';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

function RootLayout() {
  return (
    <>
    <Nav />
    <Outlet />
    <Footer />
        </>
  )
}

export default RootLayout