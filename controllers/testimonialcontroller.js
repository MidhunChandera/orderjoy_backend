const testimonialmodel = require("../models/testimonialmodel");

exports.addtestimonial=async(req,res)=>{
    try {
        const {name,email,messege}=req.body

        const newtestimonial=new testimonialmodel({
  name,email,messege
        })

        await newtestimonial.save()
        res.status(200).json('success')
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getalltestimonials=async(req,res)=>{
    try {
        const testimonials=await testimonialmodel.find({})
        res.status(200).json(testimonials)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.updatestatus=async(req,res)=>{
    try {
  
      await testimonialmodel.findByIdAndUpdate(req.body.testimonialid,{status:req.body.status})
      res.status(200).json({ success: true ,message:"status updated"});
      
    } catch (error) {
      res.status(401).json(error)
    }
  }