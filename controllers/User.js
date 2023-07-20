import User from "../models/User.js";
import { generateNewUserId } from "./UserId.js";
import bcrypt from "bcrypt";

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

        res.status(201).json({
            message: "Account created Successfully",
            user: createdUser
        });
    } catch(err){
        res.status(404).json({
            message: err.message
        });
    }
}