const router = require('express').Router();
const { checkAdmin } = require('../middleware/checkAdmin');
const {addRecipe, addIngredientToRecipe, getRecipe} = require('../controllers/recipe');


router.get('/getRecipe', getRecipe);
router.use( checkAdmin );
router.post('/addRecipe', addRecipe);


module.exports = router;