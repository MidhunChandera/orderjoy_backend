const mongoose=require('mongoose')


const testimonialschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
       
    },
    messege:{
        type:String,
        required:true
    }
    ,
    status:{
        type:String,
        required:true,
        default:"pending"
    }
})


const testimonialmodel=mongoose.model("testimonial",testimonialschema)

module.exports=testimonialmodel