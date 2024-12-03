const Category = require('../model/categoryModel')
const Restaurant = require('../model/restaurantModel')
const setCategory = async (req,res,next)=>{
    try{
    const {category} = req.body
    const categor = await Category.findOne({name:category});
    req.body.category = categor
    next();}
    catch(error){
        res.status(400).json({
            status:PAYMENT_FAILED,
            message:error
        })
    }
}

const setRestaurant = async(req,res,next)=>{
    try{
          const {restaurant} = req.body
          const restauran = await Restaurant.findOne({name:restaurant})
          req.body.restaurant = restauran
          next()
    }
    catch(error){
        res.status(400).json({
            status:PAYMENT_FAILED,
            message:error
        })
    }
}
module.exports = {setCategory,setRestaurant}