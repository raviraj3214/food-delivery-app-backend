const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant must have a name'],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Restaurant must have an address'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Restaurant must have a phone number'],
    },
    email: {
      type: String,
      required: [true, 'Restaurant must have an email'],
      unique: true,
      lowercase: true,
    },
    site: {
      type: String, // URL for the restaurant's website
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\w-]+)+[\w-]+(\.[\w-]+)+(:\d+)?(\/.*)?$/.test(v);
        },
        message: 'Please enter a valid URL.',
      },
    },
    openingHours: [
      {
        day: {
          type: String,
          required: true,
          enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
        },
        open: { type: String, required: true }, 
        close: { type: String, required: true }, 
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referring to the User model (restaurant owner)
      required: true,
    },
    foodItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    imageUrl:{
        type:String
    }
    
  },
  {
    timestamps:true
  },
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
