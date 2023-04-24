import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

export const UserModel = mongoose.model("users", Userschema)