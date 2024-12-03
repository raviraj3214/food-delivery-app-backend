const Restaurant = require('../model/restaurantModel.js');
const Category = require('../model/categoryModel.js')
const User = require('../model/userModel.js')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const getDataUri = require('../utils/datauri.js')
const cloudinary = require('../utils/cloudinary.js')

// import Restaurant from "../models/restaurantModel.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

  exports.createRestaurant = async (req, res) => {
    try {
        const { name, address, phoneNumber, email, site, openingHours,owner} = req.body;
        console.log(owner)

        if (!name || !address || !phoneNumber || !email || !owner) {
            return res.status(400).json({
                message: "Missing required fields.",
                success: false,
            });
        }
     

        // Find the user by username
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Restaurant image is required.",
                success: false,
            });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const restaurant = await Restaurant.create({
            name,
            address,
            phoneNumber,
            email,
            site,
            openingHours: JSON.parse(openingHours),
            owner:user._id,
            foodItems: [],
            imageUrl: cloudResponse.secure_url,
        });

        res.status(201).json({
            message: "Restaurant created successfully.",
            success: true,
            data: restaurant,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

// exports.getAllRestaurants = async (req, res) => {
//     try {
//         const restaurants = await Restaurant.find().populate('owner').populate('categories').populate('foodItems');

//         res.status(200).json({
//             success: true,
//             data: restaurants,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        res.status(200).json({
            success: true,
            data: restaurants,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id).populate('owner').populate('categories').populate('foodItems');

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: restaurant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phoneNumber, email, site, openingHours, categories } = req.body;

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found.",
            });
        }

        // Update the restaurant fields
        if (name) restaurant.name = name;
        if (address) restaurant.address = address;
        if (phoneNumber) restaurant.phoneNumber = phoneNumber;
        if (email) restaurant.email = email;
        if (site) restaurant.site = site;
        if (openingHours) restaurant.openingHours = JSON.parse(openingHours);
        if (categories) restaurant.categories = categories;

        // Check if a new image file is uploaded
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            restaurant.imageUrl = cloudResponse.secure_url;
        }

        await restaurant.save();

        res.status(200).json({
            success: true,
            message: "Restaurant updated successfully.",
            data: restaurant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found.",
            });
        }

        await restaurant.remove();

        res.status(200).json({
            success: true,
            message: "Restaurant deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getRestaurantsByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const restaurants = await Restaurant.find({ owner: ownerId }).populate('categories').populate('foodItems');

        if (!restaurants || restaurants.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No restaurants found for this owner.",
            });
        }

        res.status(200).json({
            success: true,
            data: restaurants,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.addCategoryInRestaurant = async (req, res, next) => {
    try {
      const { restaurantName, categoryName } = req.body;
  
      // Find the restaurant by name
      const restaurant = await Restaurant.findOne({ name: restaurantName });
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Check if the category exists, if not, create it
      let category = await Category.findOne({ name: categoryName });
      if (!category) {
        category = await Category.create({ name: categoryName });
      }
  
      // Check if the category is already added to the restaurant
      if (restaurant.categories.includes(category._id)) {
        return res.status(400).json({ message: 'Category is already associated with the restaurant' });
      }
  
      // Add the category ID to the restaurant's categories array
      restaurant.categories.push(category._id);
      await restaurant.save();
  
      res.status(201).json({
        success: true,
        message: 'Category added to the restaurant successfully',
        restaurant,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  


