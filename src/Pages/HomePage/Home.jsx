import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../../../firebase.js'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import brakepads from '../../assets/brakepads.jpg';
import carBattery from '../../assets/battery.png';
import tires from '../../assets/tires.jpg';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import homeimage from '../../assets/homeimage.webp';

const Home = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Brake Pads', price: 8500, liked: false, inCart: false, image: brakepads },
        { id: 2, name: 'Car Battery', price: 4500, liked: false, inCart: false, image: carBattery },
        { id: 3, name: 'Tires', price: 3000, liked: false, inCart: false, image: tires },
        { id: 4, name: 'Brake Pads', price: 3500, liked: false, inCart: false, image: brakepads },
        { id: 5, name: 'Brake Pads', price: 6500, liked: false, inCart: false, image: brakepads },
        { id: 6, name: 'Car Battery', price: 7500, liked: false, inCart: false, image: carBattery },
        { id: 7, name: 'Tires', price: 5000, liked: false, inCart: false, image: tires },
        { id: 8, name: 'Brake Pads', price: 1500, liked: false, inCart: false, image: brakepads },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOption, setSortOption] = useState('price-asc');
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                setCart([]);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const toggleLike = (id) => {
        if (user) {
            setProducts(products.map(product =>
                product.id === id ? { ...product, liked: !product.liked } : product
            ));
        } else {
            navigate('/login');
        }
    };

    const addToCart = async (id) => {
        if (user) {
            const product = products.find(product => product.id === id);
            const updatedProducts = products.map(p =>
                p.id === id ? { ...p, inCart: true } : p
            );
            setProducts(updatedProducts);
            setCart(prevCart => [...prevCart, product]);
    
            try {
                const updatedCart = [...cart, product];
    
                console.log('Updated Cart:', updatedCart); 
                console.log('Sending request with product:', product); 
    
                // Send cart data to your own backend
                const response = await fetch(`http://localhost:3000/api/cart/${user.uid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ items: updatedCart }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update cart');
                }
    
                const result = await response.json();
                console.log(result.message);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        } else {
            navigate('/login');
        }
    };
    

    const goToCartPage = () => {
        navigate('/cart', { state: { cart } });
    };

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCategory === 'All' || product.name.toLowerCase().includes(selectedCategory.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            return 0;
        });

    return (
        <>
            <Header onCartClick={goToCartPage} />
            <img src={homeimage} className="w-full" alt="Home" />
            <div className="container mx-auto p-5">
                <div className="flex flex-wrap justify-center gap-5 mb-5">
                    <div className="w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search for auto spare parts..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full border border-black p-2 mb-5 rounded-lg"
                        />
                    </div>
                    <div className="w-full md:w-1/4 mb-5">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full border border-black p-2 rounded-lg"
                        >
                            <option value="All">All Categories</option>
                            <option value="Brake Pads">Brake Pads</option>
                            <option value="Car Battery">Car Battery</option>
                            <option value="Tires">Tires</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/4 mb-5">
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="w-full border border-black p-2 rounded-lg"
                        >
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="popularity">Popularity</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-32">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white border border-gray-300 rounded-lg w-52 p-4 text-center shadow-md transition-transform duration-200 transform hover:scale-105">
                            <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-lg mb-2" />
                            <div className="mb-2">
                                <h3 className="text-lg text-gray-800">{product.name}</h3>
                                <p className="text-gray-600">Price: ₹{product.price}</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <button
                                    className={`p-2 rounded ${product.liked ? 'text-red-500' : ''}`}
                                    onClick={() => toggleLike(product.id)}
                                >
                                    {product.liked ? '❤️' : '♡'}
                                </button>
                                <button
                                    onClick={() => addToCart(product.id)}
                                    disabled={product.inCart}
                                    className={`p-2 rounded transition-colors ${product.inCart ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                >
                                    {product.inCart ? 'In Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="fixed bottom-0 right-0 m-5">
                    <button
                        onClick={goToCartPage}
                        className="bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600"
                    >
                        Cart ({cart.length})
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
