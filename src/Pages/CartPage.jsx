import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCart(currentUser.uid);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchCart = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/cart/${userId}`);
      setCart(response.data.items);
    } catch (err) {
      console.log('Failed to fetch cart data');
      console.error('Error fetching cart:', err);
    }
  };

  const handleBuy = async (itemId) => {
    console.log('Buy item:', itemId);
  };

  return (
    <div className="cart-page max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="cart-items space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button 
                onClick={() => handleBuy(item.id)} 
                className="btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;
