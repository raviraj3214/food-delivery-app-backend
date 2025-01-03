const { hashPassword, comparePassword } = require('../utils/auth');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync')
const jwt = require("jsonwebtoken")
const { promisify } = require('util');


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
exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  // console.error("tokennnnnn", token)



  // Ensure the Authorization header exists and follows the "Bearer <token>" format
  if (!token) {
    throw new AppError('Please login to access this route', 401);
  }



  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  // Check if the user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError('User does not exist!', 401);
  }

  // Attach user to the request object
  req.user = user;

  next();
});





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




exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('addresses');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new address
exports.addAddress = async (req, res) => {
  const { state, city, pincode, fulladdress, phone } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isDefault = user.addresses.length === 0; // Set the first address as default
    const newAddress = { state, city, pincode, fulladdress, phone, isDefault };

    user.addresses.push(newAddress);
    await user.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing address
exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  const { state, city, pincode, fulladdress, phone, isDefault } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const address = user.addresses.id(id);
    if (!address) return res.status(404).json({ message: 'Address not found' });

    // Update the address fields
    Object.assign(address, { state, city, pincode, fulladdress, phone });

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
      address.isDefault = true;
    }

    await user.save();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const address = user.addresses.id(id);
    if (!address) return res.status(404).json({ message: 'Address not found' });

    address.remove();
    await user.save();

    // Ensure at least one address is marked as default
    if (!user.addresses.some((addr) => addr.isDefault) && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
      await user.save();
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.setDefaultAddress = async (req, res) => {
  const {  addressId } = req.params;

  try {
    // Unset `isDefault` for all addresses
    await User.updateMany(
      { _id: req.user.id, "addresses.isDefault": true },
      { $set: { "addresses.$.isDefault": false } }
    );

    // Set the selected address as default
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, "addresses._id": addressId },
      { $set: { "addresses.$.isDefault": true } },
      { new: true }
    );

    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to set default address", error });
  }
};
