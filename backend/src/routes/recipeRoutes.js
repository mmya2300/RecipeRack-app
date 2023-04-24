import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/userSchema.js";
import { RecipeModel } from "../models/recipeSchema.js";


const router = express.Router()

// get all recipes based on the userID (the user who is currently logged)
router.get("/main/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipesModel.find({
            _id: { $in: user.savedRecipes },
          });
        res.status(201).json({ savedRecipes });
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
})

// add a recipe and save it
router.post("/", async (req, res) => {
    const user = await UserModel.findById(req.body.userID);
    const newRecipe = new RecipeModel({
        ownerID: user._id,
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        yield: req.body.yield,
        cookTime: req.body.cookTime,
        completionStatus: req.body.completionStatus
    })
    try {
      await newRecipe.save()
        try {
                user.savedRecipes.push(newRecipe)
                await user.save()
                res.status(201).json({ savedRecipes: user.savedRecipes });
            } catch (error) {
                res.status(500).json(err);
            }
    } catch (err) {
        res.status(500).json(err);
    }
})

// get a specfic recipe and all it's infomation
router.get("/main/view/:recipeID", async (req, res) => {

})

export {router as recipeRouter}
