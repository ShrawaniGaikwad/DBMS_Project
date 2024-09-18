const express = require('express');
const router = express.Router();
const cors=require('cors');
const mongoose = require('mongoose');
router.use(express.json());
const db = "mongodb://localhost:27017/DBMS_project";
const app=express();
app.use(cors());
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

const PORT = process.env.PORT || 3000;
app.use(router);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});