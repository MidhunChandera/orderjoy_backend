const mongoose=require('mongoose')

const foodschema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true, 
    },
    desc: {
        type: String,
        required: true, 
    },
    category: {
        type: String,
        required: true, 
    },
    rating: {
        type: Number,
        default: 0, // Default rating to 0 if not provided
    }
})

const foodmodel=mongoose.model("foods",foodschema)

module.exports=foodmodel