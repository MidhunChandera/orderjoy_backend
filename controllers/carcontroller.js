const usermodel = require("../models/usermodel");


//add to users cart
exports.addtocart = async (req, res) => {
  try {
    const { userid, itemid } = req.body;

    // Validate inputs
    if (!userid || !itemid) {
      return res.status(400).json({ success: false, message: 'User ID and Item ID are required' });
    }

    // Find user
    let userdata = await usermodel.findById(userid);

    if (!userdata) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get and update cart data
    let cartdata = { ...userdata.cartdata };
    if (!cartdata[itemid]) {
      cartdata[itemid] = 1;
    } else {
      cartdata[itemid] += 1;
    }

    // Save updated cart data
    await usermodel.findByIdAndUpdate(userid, { cartdata }, { new: true });

    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


//remove from usercart
exports.removefromcart = async (req, res) => {
    try {
      let userdata = await usermodel.findById(req.body.userid);
      let cartdata = userdata.cartdata;
     console.log(req.body);
     
      if (cartdata[req.body.itemid]>0) {
cartdata[req.body.itemid]-=1
      }
      await usermodel.findByIdAndUpdate(req.body.userid, { cartdata });
   
      res.status(200).json("Removed from cart");
 
      
  
      // Update the cart in the database
      
  
     
    } catch (error) {
      res.status(401).json(error);
    }
  };
  
  

//fetch usercart 
exports.getcart = async (req, res) => {
    try {
      const { userid } = req.body; // Get userid from the request body
      let userdata = await usermodel.findById(userid);
      if (!userdata) {
        return res.status(404).json("User not found");
      }
      let cartdata = userdata.cartdata;
      res.status(200).json(cartdata);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  