import './App.css'
import LoginPage from './Pages/LoginPage'
import Home from './Pages/HomePage/Home.jsx'
import CartPage from './Pages/CartPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/Signup';
import SellerPage from './Pages/SellerPage.jsx';
import FillDetails from './Pages/FillDetails/FillDetails.jsx';

function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/seller" element={<SellerPage/>}></Route>
        <Route path="/fill-details" element={<FillDetails />} />

      </Routes>
     </Router>
    </>
  )
}

export default App
