import express from "express";
import mongoose from "mongoose";

import { RecipeModel } from "../models/recipeSchema.js";


const router = express.Router()


export {router as recipeRouter}
