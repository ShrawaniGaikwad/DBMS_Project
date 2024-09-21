import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import cartIcon from '../../assets/cart.png'; 
import { auth } from '../../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth'; 

const Header = ({ onCartClick }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = '/login'; 
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    return (
        <header className="header-container">
            <div className="logo">
                <h1>Auto Spare Parts</h1>
            </div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/seller">Sell</Link></li>
                    {user ? (
                        <>
                            <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                    <button className="cart-button" onClick={onCartClick} style={{ width: '30px' }}>
                        <img src={cartIcon} alt="Cart" />
                    </button>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
