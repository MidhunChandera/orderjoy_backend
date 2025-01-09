const foodmodel = require("../models/foodmodel");
const fs=require('fs')
// Add food
exports.addfood = async (req, res) => {
  try {
    // Ensure req.file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract the filename or construct the image path
    const imagename = req.file.filename // Only the filename

 

    // Create a new food object
    const food = new foodmodel({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      img: imagename, // Save the filename or path
    });

    // Save to database
    await food.save();
    res.status(200).json({ message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


//list food

exports.listfood=async(req,res)=>{
    try {
        const foods=await foodmodel.find({})
        res.status(200).json(foods)
    } catch (error) {
        res.status(401).json(error)
    }
}

//remove food
exports.removefood=async(req,res )=>{
    try {
        const food=await foodmodel.findById(req.body.id)
        fs.unlink(`uploads/${food.img}`,()=>{}) //remove image from upload foler

        await foodmodel.findByIdAndDelete(req.body.id)//remove from database
        res.status(200).json('food removed')
    } catch (error) {
        res.status(401).json(error)
    }
}