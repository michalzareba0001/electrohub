import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import HomePage from './Pages/HomePage'
import Shop from './Pages/Shop'
import AboutUs from './Pages/AboutUs'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserPanel from './Pages/UserPanel'
import { UserProvider } from './Context/UserContext'
import { CartProvider } from './Context/CartContext'



function App() {
  return (
    <div className="App">
      <CartProvider>
        <UserProvider>

          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePage />} index />
              <Route path='/shop' element={<Shop />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product' element={<Product />}>
                <Route path=':id' element={<Product />} />
              </Route>

              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/userpanel' element={<UserPanel />} />

            </Routes>
            <Footer />
          </BrowserRouter>

        </UserProvider>
      </CartProvider>
    </div >
  );
}

export default App;
