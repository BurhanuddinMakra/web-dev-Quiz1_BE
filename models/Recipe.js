const mongoose = require('mongoose');

const schema = mongoose.Schema;



const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
        type: schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    ingredients:  [
        {
            type: schema.Types.ObjectId,
            ref: "Ingredients"
        }
      ]
    
});

const Recipes = mongoose.model('Recipes', recipeSchema);

module.exports = Recipes;