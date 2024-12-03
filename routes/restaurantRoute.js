const express = require('express')
const {singleUpload, uploadFiles} = require('../utils/multer.js')
const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsByOwner,
    addCategoryInRestaurant
} = require("../controllers/restaurantController.js");

const router = express.Router();

router.post("/", singleUpload, createRestaurant);
router.patch("/addcategory",addCategoryInRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.patch("/:id", singleUpload, updateRestaurant);
router.delete("/:id", deleteRestaurant);
router.get("/owner/:ownerId", getRestaurantsByOwner);

module.exports= router;
