const mongoose = require('mongoose');


const schema = mongoose.Schema;



const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String},
    
    
});

const Ingredients = mongoose.model('Ingredients', ingredientSchema);

module.exports = Ingredients;