const FoodItem = require('../model/foodItemModel.js');
const Restaurant = require('../model/restaurantModel.js');
const Category = require('../model/categoryModel.js');
const getDataUri = require('../utils/datauri.js');
const cloudinary = require('../utils/cloudinary.js');

exports.createFoodItem = async (req, res) => {
    try {
        const { name, description, price, category, restaurant, available } = req.body;

        if (!name || !description || !price || !category || !restaurant) {
            return res.status(400).json({
                message: "Missing required fields.",
                success: false,
            });
        }

        // Validate category
        // const categoryExists = await Category.findById(category);
        // if (!categoryExists) {
        //     return res.status(404).json({ 
        //         message: "Category not found", 
        //         success: false 
        //     });
        // }

        // // Validate restaurant
        // const restaurantExists = await Restaurant.findById(restaurant);
        // if (!restaurantExists) {
        //     return res.status(404).json({ 
        //         message: "Restaurant not found", 
        //         success: false 
        //     });
        // }

        // Validate and upload image
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Food item image is required.",
                success: false,
            });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Create food item
        const foodItem = await FoodItem.create({
            name,
            description,
            price,
            category:category._id,
            restaurant:restaurant._id,
            image: cloudResponse.secure_url,
            available: available !== undefined ? available : true,
        });

        res.status(201).json({
            message: "Food item created successfully.",
            success: true,
            data: foodItem,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

exports.getFoodItemsByRestaurant = async (req, res) => {
    try {
        const { restaurantid } = req.params;
        console.log("restaurant",restaurantid)

        // Validate the restaurant exists
        const restaurant = await Restaurant.findById(restaurantid);
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
                success: false,
            });
        }

        // Find all food items associated with the restaurant
        const foodItems = await FoodItem.find({ restaurant: restaurantid })
            .populate('category', 'name') // Populates category name
        
        const categories = foodItems.map(item => item.category);
        const uniqueCategories = Array.from(new Set(categories.map(c => c.name))).map(name => categories.find(c => c.name === name)).map(category => category.name);
        res.status(200).json({
            message: "Food items fetched successfully",
            success: true,
            data: foodItems,
            categories: uniqueCategories,
            restaurant:restaurant
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};
