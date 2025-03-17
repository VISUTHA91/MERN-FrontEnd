
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from './Layouts/RootLayout';
import Nav from './Components/Nav'
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import FAQ from './Pages/Faq'
import Signin from './Pages/Signin';
import Cart from './Pages/Cart';
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
import ProfilePage from './Pages/User/ProfilePage';
import AdminProductlist from './Pages/Admin/AdminProductlist';
import VendorSignup from './Pages/Vendor/VendorSignup';
import VendorLogin from './Pages/Vendor/VendorLogin';
import VendorDashboard from './Pages/Vendor/VendorDashboard';
import VendorMainContent from './Pages/Vendor/VendorMainContent';
import VendorList from './Pages/Admin/VendorList';
import VendorDetails from './Pages/Vendor/VendorDetails';
import VendorProductCreation from './Pages/Vendor/VendorProductCreation';
import VendorOrders from './Pages/Vendor/VendorOrders';
import Payment from './Pages/Payment';
import VendorProductList from './Pages/Vendor/VendorProductList'
import EditProductPage from './Pages/Vendor/EditProductPage';
import AdminOrders from './Pages/Admin/AdminOrders';
import UserOrderPage from './Pages/User/UserOrder';
import AdminVendorDetails from './Pages/Admin/AdminVendorDetails';
import Address from './Pages/User/Address';
import WishlistPage from './Pages/WhislistPage';
import Invoice from './Pages/Vendor/Invoice';
import Reviews from './Pages/Vendor/Reviews';
import VendorLayout from './Layouts/VendorLayout';
import AdminCategory from './Pages/Admin/AdminCategory';
// import ForgotPassword from './Pages/ForgotPassword';
// import VendorProductlist from './Pages/Vendor/VendorProductlist';
import PasswordReset from './Pages/PasswordReset';

function App() {
  const [cartCount, setCartCount] = useState(0); // State to keep track of cart count

  // Function to handle adding item to cart
  const addToCart = () => {
    setCartCount(cartCount + 1); // Increase cart count by 1
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <ToastContainer />
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout cartCount={cartCount} />} >
            <Route index element={<Home />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Signin' element={<Signin />} />
            <Route path='/Signup' element={<Signup />} />
            {/* <Route path='/ForgotPassword' element={<ForgotPassword />} /> */}
            <Route path='/reset-password/:token' element={<PasswordReset />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Wishlist' element={<WishlistPage />} />
            <Route path='/Payment' element={<Payment />} />
            <Route path='/Support' element={<Support />} />
            <Route path='/FAQ' element={<FAQ />} />
            <Route path='/Productlist/:categoryName' element={<Productlist />} />
            <Route path='/Productlist/gender/:gender' element={<Productlist />} />
            <Route path='/Productlist' element={<Productlist />} />
            <Route path='/User/ProfilePage/' element={<ProfilePage />} />
            <Route path='/User/Profile/' element={<Profile />} />
            <Route path='/User/UserOrder/' element={<UserOrderPage />} />
            <Route path='/User/Address/' element={<Address />} />
            <Route path='/Productdetails/:id' element={<Productdetails addToCart={addToCart} />} />
          </Route>
          {/* Admin Layout */}
          <Route element={<AdminLayout />} >
            <Route path='/Dashboard' element={<Dashboard />} >
              <Route index element={<Maincontent />} />
              <Route path='category' element={<AdminCategory />} />
              <Route path='users' element={<Userlist />} />
              <Route path='VendorList' element={<VendorList />} />
              <Route path='VendorDetails/:id' element={<VendorDetails />} />
              <Route path='Createproduct' element={<Createproduct />} />
              <Route path='Productlist' element={<AdminProductlist />} />
              <Route path='AdminVendorDetails' element={<AdminVendorDetails />} />
              <Route path='VendorList' element={<VendorList />} />
              <Route path='AdminOrders' element={<AdminOrders />} />
            </Route>
          </Route>

          {/* Vendor Layout */}
          <Route element={<VendorLayout />} >
            <Route path="/Vendor/login" element={<VendorLogin />} />
            <Route path="/Vendor/VendorSignup" element={<VendorSignup />} />
            <Route path='/VendorDashboard' element={<VendorDashboard />} >
            {/* <Route path='/Vendor/VendorSignup' element={<VendorSignup />} > */}
              <Route index element={<VendorMainContent />} />
              <Route path='VendorProductList' element={<VendorProductList />} />
              <Route path="VendorProductCreation" element={<VendorProductCreation />} />
              {/* <Route path="/Vendor/" element={<Userlist />} /> */}
              <Route path="VendorOrders" element={<VendorOrders />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="invoice" element={<Invoice />} />
              {/* <Route path="VendorProductlist" element={<VendorProductlist />} /> */}
              <Route path="editproduct/:id" element={<EditProductPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App