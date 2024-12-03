const { hashPassword, comparePassword } = require('../utils/auth');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync')
const jwt = require("jsonwebtoken")

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      data: { user: newUser },
    });
  } catch (error) {
    next(error);
  }
};


exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      // Find the user by email
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid email or password',
        });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordCorrect = await comparePassword(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid email or password',
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      // console.log("hjdshbbvjvd",token)
    
      return res.status(200)
        .cookie("token", token, { 
            httpOnly: true, 
            sameSite: 'none',
            secure: true,
            maxAge: 1 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: 'Login successful',
          data: {
            user: { email: user.email, name: user.name, _id: user._id },
            token
          },
          
        });
  
      // Proceed with login success (e.g., generate token)
    //   res.status(200).json({
    //     status: 'success',
    //     message: 'Login successful',
    //   });
  
    } catch (error) {
      next(error);
    }
  };


  exports.getUserProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  });
  
  // Add or update an address
  exports.addOrUpdateAddress = catchAsync(async (req, res, next) => {
    const { street, city, state, pincode, landmark, isDefault } = req.body;
  
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }
  
    // Add address or update existing
    const addressIndex = user.addresses.findIndex((addr) => addr.isDefault);
    if (addressIndex >= 0 && isDefault) {
      user.addresses[addressIndex].isDefault = false; // Reset previous default
    }
    user.addresses.push({ street, city, state, pincode, landmark, isDefault });
    await user.save();
  
    res.status(200).json({
      status: 'success',
      data: { addresses: user.addresses },
    });
  });