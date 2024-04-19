const router = require('express').Router();
const { checkAdmin } = require('../middleware/checkAdmin');
const {addIngredient} = require('../controllers/ingredient');



router.use( checkAdmin );
router.post('/addIngredient', addIngredient);


module.exports = router;