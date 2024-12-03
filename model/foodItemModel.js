const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food item must have a name'],
    },
    description: {
      type: String,
      required: [true, 'Food item must have a description'],
    },
    price: {
      type: Number,
      required: [true, 'Food item must have a price'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Referring to the Category model
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant', // Referring to the Restaurant model
      required: true,
    },
    image: {
      type: String, // URL to the food item's image
    },
    available: {
      type: Boolean,
      default: true,
    },
  
  },
  {
    timestamps:true
  }
);

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
