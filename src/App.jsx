
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

function App() {
  
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
          <Route element={<RootLayout />} >
            <Route index element={<Home />} />
            <Route path='/Home' element={<Home/>} />
      {/* <Route path='/Products' element={<Products/>} /> */}
      <Route path='/About' element={<About/>} />
      <Route path='/Contact' element={<Contact/>} />
      <Route path='/Signin' element={<Signin/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Cart' element={<Cart/>} />
      <Route path='/Productlist' element={<Productlist/>} />
      <Route path='/Productdetails/:id' element={<Productdetails/>} />
    </Route>

            </Routes>
            </BrowserRouter>
            </div>

            )
}

export default App
