const express=require('express')
const { loginuser, registeruser, adminlogin } = require('../controllers/usercontroller')


const userrouter=express.Router()

userrouter.post('/register',registeruser)

userrouter.post('/login',loginuser)

userrouter.post('/admin',adminlogin)
module.exports=userrouter