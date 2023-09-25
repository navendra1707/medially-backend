import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import { generateNewUserId } from "./UserId.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            code,
            phone,
            gender,
            dob,
        } = req.body;

        const presentUser = await User.findOne({email: email});
        if(presentUser){
            throw new Error("Email ID already exists.");
        }

        const userId = await generateNewUserId();

        const salt = await bcrypt.genSalt(); //it provides a random salt, i.e., number of rounds of hashing
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: passwordHash,
            code,
            phone,
            gender,
            dob,
            userId
        });

        const createdUser = await newUser.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);
        delete createdUser.password;

        res.status(201).json({
            message: "Account created Successfully",
            user: createdUser,
            token
        });
    } catch(err){
        res.status(404).json({
            message: err.message
        });
    }
}

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({message: 'User does not exists.'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // sign the token with user id and use a key JWT_SECRET
        delete user.password // so that it is not sent back to frontend in res
        res.status(200).json({ 
            message: "logged in successfully",
            token, 
            user 
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
}

export const doctorLogin = async (req, res) => {
    try {
        const {userId, password} = req.body;
        const user = await Doctor.findOne({ userId: userId });
        if(!user) return res.status(400).json({message: 'User does not exists.'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // sign the token with user id and use a key JWT_SECRET
        delete user.password // so that it is not sent back to frontend in res
        res.status(200).json({ 
            message: "logged in successfully",
            token, 
            user 
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
}