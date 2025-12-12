import User from '../model/user_model.js';
import bcrypt from 'bcryptjs';

//for signup
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const userdata = await User.findOne({ email });
        if (userdata) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);//here 10 is the salt rounds for hashing the password which adds more security than 8(default salt rounds)

        // Create new user
        const newUser = new User({ fullname, email, password: hashPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user:{
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email
        } });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: error.message });
    }
};

//for login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const userdata = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, userdata.password);
        if (!userdata || !isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        else{
            res.status(200).json({ message: 'Login successful', user:{
                _id: userdata._id,
                fullname: userdata.fullname,
                email: userdata.email
            } });
        }
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};