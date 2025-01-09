const express=require('express')
const { placeorder, verifyorder, userorder, cancelorder, deleteOrder, listallorders, updatestatus } = require("../controllers/ordercontroller");
const { authenticate } = require('../middleware/Authenticate');



const orderrouter=express.Router()

orderrouter.post('/place',authenticate,placeorder)
orderrouter.post('/verify',verifyorder)
orderrouter.post('/userorder',authenticate,userorder)
orderrouter.post('/cancel',cancelorder)
orderrouter.post('/delete',deleteOrder)
orderrouter.get('/list',listallorders)
orderrouter.post('/status',updatestatus)
module.exports=orderrouter