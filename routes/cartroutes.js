const express=require('express')
const { addtocart, removefromcart, getcart } = require("../controllers/carcontroller");
const { authenticate } = require('../middleware/Authenticate');
const cartrouter=express.Router()

cartrouter.post('/add',authenticate,addtocart)
cartrouter.post('/remove',authenticate,removefromcart)
cartrouter.post('/get',authenticate,getcart)


module.exports=cartrouter