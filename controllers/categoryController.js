const Category = require('../model/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Create a new category
exports.createCategory = catchAsync(async (req, res, next) => {
  const name  = req.body.name;

  const category = await Category.create({ name });

  res.status(201).json({
    status: 'success',
    data: { category },
  });
});

// Get all categories
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: { categories },
  });
});
