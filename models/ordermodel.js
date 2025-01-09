const mongoose=require('mongoose')


const orderschema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
  
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food proccessing"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:String,
        default:"false"
    }
})

const ordermodel=mongoose.model("order",orderschema)
module.exports=ordermodel