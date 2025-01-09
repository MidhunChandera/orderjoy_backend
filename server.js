const express=require('express')
require('dotenv').config()
const cors=require('cors')
const userrouter = require('./routes/userroutes')
const foodrouter = require('./routes/foodroutes')
const cartrouter = require('./routes/cartroutes')
const orderrouter = require('./routes/orderroutes')
const testimonialrouter = require('./routes/testimonialroutes')
require('./config/connection')
const foodapp=express()

const PORT=4007 || process.env.PORT

foodapp.use(express.json())
foodapp.use(cors())

//api endpoint
foodapp.use('/api/user',userrouter)
foodapp.use('/api/food',foodrouter)
foodapp.use('/api/cart',cartrouter)
foodapp.use('/api/order',orderrouter)
foodapp.use('/api/testimonial',testimonialrouter)
foodapp.use('/images',express.static('uploads'))
foodapp.get('/',(req,res)=>{
  res.send('api working')
})

foodapp.listen(PORT,()=>{
    console.log('server running');
    
})