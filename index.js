const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const authRouter = require("./routes/auth");
const ingredientRouter = require("./routes/ingredient");
const recipeRouter = require("./routes/recipe");



const { verifyToken } = require("./middleware/verifyToken");


app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use(verifyToken); // This is the middleware that checks for the token
app.use("/ingredient", ingredientRouter);
app.use("/recipe", recipeRouter);


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Quiz1");
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
connectDB();
