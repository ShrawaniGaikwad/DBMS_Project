const express = require('express');
const router= express.Router();
const mongoose=require('mongoose');
router.use(express.json());
const db = "mongodb://localhost:27017/DBMS_Project";
const app=express();
mongoose.connect(db).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const signupschema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const Signup = mongoose.model('signup', signupschema, 'signup');

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const newsignup = new Signup(req.body);
        const savedsignup = await newsignup.save();
        console.log('signup data saved successfully:', savedsignup);
        res.json({ message: 'signup data added successfully', newsignup: savedsignup });
    } catch (error) {
        console.error('Error saving signup data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const cartSchema = new mongoose.Schema({
    userId: String,
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ]
});
const Cart = mongoose.model('cart', cartSchema, 'cart');

// Route to add items to the cart
router.post('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { items } = req.body;

        // Find or create a cart for the user
        let userCart = await Cart.findOne({ userId });
        if (!userCart) {
            userCart = new Cart({ userId, items });
        } else {
            // Update cart with new items
            userCart.items = items;
        }

        const savedCart = await userCart.save();
        console.log(savedCart);
        res.json({ message: 'Cart updated successfully', cart: savedCart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get the cart for a user
router.get('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userCart = await Cart.findOne({ userId });
        if (userCart) {
            res.json(userCart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports= router;
