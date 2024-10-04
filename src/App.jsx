
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import RootLayout from './Layouts/RootLayout';
// import { RouterProvider } from 'react-router';
import Nav from './Components/Nav'
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Signin from './Pages/Signin';
import Cart from './Pages/Cart';
// import CrewneckProducts from './Pages/CrewneckProducts';
import Signup from './Pages/Signup';
import Productlist from './Pages/Productlist';
import Productdetails from './Pages/Productdetails';
import { useState } from 'react';
import Support from './Pages/Support';
import ScrollToTop from './Components/ScrollToTop';
import Dashboard from './Pages/Admin/Dashboard';
import Userlist from './Pages/Admin/Userlist';
import Createproduct from './Pages/Admin/Createproduct';
import Maincontent from './Pages/Admin/Maincontent';
import AdminLayout from './Layouts/AdminLayout';
import Profile from './Pages/User/Profile';
import AdminProductlist from './Pages/Admin/AdminProductlist';

function App() {
  const [cartCount, setCartCount] = useState(0); // State to keep track of cart count

  // Function to handle adding item to cart
  const addToCart = () => {
    setCartCount(cartCount + 1); // Increase cart count by 1
  };
  
  return (
    <div className='App'>
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
          <Route element={<RootLayout  cartCount={cartCount} />} >
            <Route index element={<Home />} />
            <Route path='/Home' element={<Home/>} />
      <Route path='/About' element={<About/>} />
      <Route path='/Contact' element={<Contact/>} />
      <Route path='/Signin' element={<Signin/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Cart' element={<Cart/>} />
      <Route path='/Support' element={<Support/>} />
      <Route path='/Productlist/:categoryName' element={<Productlist/>} />
      <Route path='/User/Profile' element={<Profile />} />
      <Route path='/Productdetails/:id' element={<Productdetails  addToCart={addToCart}  />} />
          </Route>


          {/* Admin Layout */}
        <Route element={<AdminLayout  />} >
        <Route index element={<Dashboard />} />
        <Route path='/Admin/Dashboard' element={<Dashboard />} />
      <Route path='/Admin/Userlist' element={<Userlist />} />
      <Route path='/Admin/Createproduct' element={<Createproduct />} />
      <Route path='/Admin/AdminProductlist' element={<AdminProductlist />} />
        </Route>




          </Routes>
        </BrowserRouter>
    </div>

          )
}

export default App
