const express = require('express')
const {getUserProfile,loginUser,createUser,addOrUpdateAddress,protect,setDefaultAddress,getAddresses,addAddress,updateAddress,deleteAddress} = require('../controllers/authController')
const router = express.Router()
router.post('/register',createUser)
router.post('/login',loginUser)
router.get('/',protect,getUserProfile)
router.patch('/:id',protect,addOrUpdateAddress)

router.put('/address/:addressId/default',protect, setDefaultAddress);
router.get('/addresses', protect, getAddresses); 
router.post('/address', protect, addAddress); 
router.put('/address/:id', protect, updateAddress); 
router.delete('/address/:id', protect, deleteAddress); 

module.exports = router