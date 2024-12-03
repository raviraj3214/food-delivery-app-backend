const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
      street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
      },
      pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
      },
      landmark: {
        type: String,
        trim: true,
      },
      isDefault: {
        type: Boolean,
        default: false, // Indicates if this is the default address
      },
    },
    { _id: false }, // Prevents creation of a separate ID for each address
  );

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [100, 'Name must be less than or equal to 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // Regex to validate email format
          return /^([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4})$/i.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: true,
      minlength: [10, 'Phone number must be at least 10 characters long'],
      maxlength: [15, 'Phone number must be less than or equal to 15 characters'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false, // Do not return password in queries by default
    },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
