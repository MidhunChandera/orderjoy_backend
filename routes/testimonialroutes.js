const express=require('express')
const { addtestimonial, getalltestimonials, updatestatus } = require('../controllers/testimonialcontroller')

const testimonialrouter=express.Router()

testimonialrouter.post('/add',addtestimonial)
testimonialrouter.post('/get',getalltestimonials)
testimonialrouter.post('/status',updatestatus)
module.exports=testimonialrouter