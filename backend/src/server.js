import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import {userRouter} from "./routes/userRoutes.js"
import { recipeRouter } from './routes/recipeRoutes.js';


const mongoURL = "mongodb+srv://Tester321:ForTesting123@reciperack-cluster.33uzuqj.mongodb.net/RecipeRack-data?retryWrites=true&w=majority"
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB database:', error);
  });

app.use("/auth", userRouter)
app.use("/recipes", userRouter)

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});










