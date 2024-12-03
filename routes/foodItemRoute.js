const express = require('express');
const { singleUpload } = require('../utils/multer.js');
const { createFoodItem, getFoodItemsByRestaurant } = require('../controllers/foodItemController.js');
const {setCategory,setRestaurant} = require('../utils/helper.js');
const { getRestaurantById } = require('../controllers/restaurantController.js');

const router = express.Router();

router.post("/", singleUpload,setCategory,setRestaurant, createFoodItem);
router.get("/:restaurantid",getFoodItemsByRestaurant)

module.exports = router;
