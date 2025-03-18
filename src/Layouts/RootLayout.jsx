import React  from 'react'
import Nav from '../Components/Nav';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

function RootLayout({children , cartCount}) {
  return (
    <>
    <div>
    <Nav cartCount={cartCount} />
    {children}
    </div>
    <Outlet />
    <Footer />
    </>
  )
}

export default RootLayout