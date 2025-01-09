const usermodel = require("../models/usermodel")
const jwt=require('jsonwebtoken')
const createtoken=(id)=>{
return jwt.sign({id},process.env.jwt_secret)
}
exports.loginuser=async(req,res)=>{
 try {
    const{email,password}=req.body
    const user=await usermodel.findOne({email,password})
    if(user){
        const token=createtoken(user._id)
        res.status(200).json({user,token})
    }
    else{
        res.status(406).json("incorrect email or password")
    }
    
 } catch (error) {
    res.status(401).json(error)
 }
}

exports.registeruser=async(req,res)=>{
try {
    const{username,email,password}=req.body
    const existinguser=await usermodel.findOne({email})
    if(existinguser){
        res.status(406).json('user already exists')
    }
    else{
        const newuser=new usermodel({
            username,
            email,
            password
        })
        
   const user=     await newuser.save()
        const token=createtoken(user._id)
        res.json({success:true,token})
    }
    
} catch (error) {

    res.status(401).json(error)
    
}
}

exports.adminlogin=async(req,res)=>{
    try {
        const{email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASS){
            const token=jwt.sign(email+password,process.env.jwt_secret)
            res.json({success:true,token})
        }
        else{
            res.status(406).json("inavlid email or password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}