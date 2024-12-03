const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Place a new order
exports.placeOrder = catchAsync(async (req, res, next) => {
  const { items, deliveryAddress, paymentMethod } = req.body;

  // Ensure items exist and calculate total
  let totalAmount = 0;
  const foodItems = await FoodItem.find({ _id: { $in: items.map((i) => i.foodItem) } });

  const orderItems = items.map((item) => {
    const food = foodItems.find((f) => f._id.toString() === item.foodItem);
    if (!food) {
      return next(new AppError(`Food item with ID ${item.foodItem} not found`, 404));
    }
    totalAmount += food.price * item.quantity;
    return {
      foodItem: food._id,
      quantity: item.quantity,
      price: food.price,
      total: food.price * item.quantity,
    };
  });

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    totalAmount,
    deliveryAddress,
    paymentMethod,
  });

  res.status(201).json({
    status: 'success',
    data: { order },
  });
});

// Get order details by ID
exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate('items.foodItem').populate('user');
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

// Get all orders for the logged-in user
exports.getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders },
  });
});

// Update order status (for restaurants/admins)
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.status = status; // Update the status (e.g., 'Preparing', 'Out for Delivery', 'Completed')
  await order.save();

  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

// Get all orders for a restaurant
exports.getRestaurantOrders = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const orders = await Order.find({ 'items.foodItem.restaurant': restaurantId })
    .populate('items.foodItem')
    .populate('user');

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders },
  });
});
