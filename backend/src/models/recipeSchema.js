import mongoose from "mongoose";

// the schema for a recipe
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
    }
})

// attach the recipe model to the userRecipes database
export const RecipeModel = mongoose.model("userRecipes", RecipeSchema)