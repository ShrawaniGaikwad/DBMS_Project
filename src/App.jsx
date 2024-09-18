import './App.css'
import LoginPage from './Pages/LoginPage'
import Home from './Pages/HomePage/Home'
import CartPage from './Pages/CartPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/Signup';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
