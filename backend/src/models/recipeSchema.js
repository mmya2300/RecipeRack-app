import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId, ref: "users", required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{type: String, required: true,}],
    directions: [{
        type: String,
        required: true,
    }],
    yield: {type: String, required: true},
    cookTime: {
        type: Number, required: true
    },
    completionStatus: {
        timeLeft: { type: String, required: true },
        status: { type: String, required: true }
      },
    timesCompleted: [{
        type: Date,
        default: Date.now
    }]

})

export const RecipeModel = mongoose.model("userRecipes", RecipeSchema)