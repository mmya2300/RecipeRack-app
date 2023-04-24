import express from "express";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/userSchema.js";

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { name, username, password, goalType } = req.body;
        const user = await UserModel.findOne({ username: username });
        if (user) {
            return res.json({ message: "user already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, username, password: hashedPassword, goalType });
        await newUser.save();
        res.json({ message: "register success" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }

})
router.post("/login", async (req, res) => {
    const {username, password} = req.body
    const user = await UserModel.findOne({username: username})
    if(!user){
        return res.json({message: "user does not exist. Please register"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.json({message: "username or password is not valid"})
    }

    res.json({userID: user._id, message: "login success"})
})


export {router as userRouter}
