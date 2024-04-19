const Ingredients = require("../models/Ingredient");
const Users = require("../models/User");
const Recipe = require("../models/Recipe");

const getRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("ingredients");
        return res.status(200).json({ success: true, msg: "All recipes", data: recipes });
    } catch (error) {
        res.status(500).json({ success: false, msg: "An error occurred while fetching the recipes", data: [] });
    }
};

const addRecipe = async (req, res) => {
    try {
        const { name, description, ingredients} = req.body;
        const recipe = await Recipe.create({
            name,
            description,
            ingredients,
            createdBy: req.user.id
        });
        return res.status(201).json({ success: true, msg: "Recipe created successfully", data: recipe });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "An error occurred while creating the recipe", data: [] });
    }
};



module.exports = { getRecipe, addRecipe};