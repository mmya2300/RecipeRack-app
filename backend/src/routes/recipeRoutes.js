import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/userSchema.js";
import { RecipeModel } from "../models/recipeSchema.js";


const router = express.Router()

// get all recipes based on the userID (the user who is currently logged)
router.get("/main/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const savedRecipes = await RecipeModel.find({
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
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const newRecipe = new RecipeModel({
        ownerID: req.body.ownerID,
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
                user.savedRecipes.push(newRecipe._id)
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
    try {
      const { recipeID } = req.params;
      if (!mongoose.Types.ObjectId.isValid(recipeID)) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      const result = await RecipeModel.findById(recipeID);
      if (!result) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// delete a recipe

router.delete("/delete/:recipeID", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.recipeID);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const ownerId = new mongoose.Types.ObjectId(recipe.ownerID);
    const user = await UserModel.findById(ownerId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await RecipeModel.deleteOne(recipe._id);
    user.savedRecipes = user.savedRecipes.filter(
      (savedRecipe) => savedRecipe.toString() !== recipe._id.toString()
    );
    await user.save();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// edit a recipe
router.put("/:recipeID", async (req, res) => {
  try {
    const { recipeID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeID)) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      recipeID,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update completion status

export {router as recipeRouter}
