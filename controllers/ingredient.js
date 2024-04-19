const Ingredients = require("../models/Ingredient");
const Users = require("../models/User");

const addIngredient = async (req, res) => {
    try {
        const { name, description } = req.body;
        const ingredient = await Ingredients.create({
            name,
            description,
            updatedBy: req.user._id
        });
        return res.status(201).json({ success: true, msg: "Ingredient created successfully", data: ingredient });
    } catch (error) {
        res.status(500).json({ success: false, msg: "An error occurred while creating the ingredient", data: [] });
    }
};




module.exports = { addIngredient  };
