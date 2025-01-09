const express=require('express')
const { addfood, listfood, removefood } = require('../controllers/foodcontroller')
const multer = require('multer')


const foodrouter=express.Router()

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})


foodrouter.post('/add',upload.single("img"),addfood)
foodrouter.get('/list',listfood)
foodrouter.post('/remove',removefood)
 

module.exports=foodrouter