import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage'
import Shop from './Pages/Shop'
import AboutUs from './Pages/AboutUs'
import Contact from './Pages/Contact'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
