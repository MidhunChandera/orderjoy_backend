const { default: Stripe } = require("stripe");
const ordermodel = require("../models/ordermodel");
const usermodel = require("../models/usermodel");


const stripe = new Stripe(process.env.stripe_Secretkey);

FRONTEND_URL='http://localhost:5173/'
exports.placeorder = async (req, res) => {
  try {
    // Ensure `items` in the request body includes `image`
    const items = req.body.items.map((item) => ({
      name: item.name,
      price: item.price,
      total: item.total,
      image: item.image // Include the image field
    }));
console.log(items);


    const neworder = new ordermodel({
      userid: req.body.userid,
      items, // Save the updated items array
      amount: req.body.amount,
      address: req.body.address
    });

    await neworder.save();



    // Prepare list items for Stripe
    const listitems = req.body.items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name
        },
        unit_amount: item.total * 100 
      },
      quantity: 1
    }));

    // Add delivery charges to the Stripe items
    listitems.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery charges'
        },
        unit_amount: 50 * 100 // Delivery fee (converted to paise)
      },
      quantity: 1
    });

    // Create the payment intent on Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: listitems,
      mode: 'payment',
      success_url: `${FRONTEND_URL}verify?success=true&orderId=${neworder._id}`,
      cancel_url: `${FRONTEND_URL}verify?success=false&orderId=${neworder._id}`,
    });

    // Send the Stripe session URL for redirection
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};


exports.verifyorder=async(req,res)=>{
   const{orderId,success}=req.body
   try {
    if (success === "true") {
        // Update order status to paid
        await ordermodel.findByIdAndUpdate(orderId, { payment: "true" });
        res.status(200).json({ success: true });
      } else {
        // If payment failed, delete the order
        await ordermodel.findByIdAndDelete(orderId);
        res.status(406).json({ success: false, message: "payment failed" });
      }
      
    
   } catch (error) {
    res.status(401).json(error)
   }
    
}

exports.userorder=async(req,res)=>{
  try {
    const orders=await ordermodel.find({userid:req.body.userid})
    res.status(200).json(orders)
    
  } catch (error) {
    res.status(401).json(error)
  }
}






exports.cancelorder = async (req, res) => {
  try {
    
    const { orderId } = req.body;

    
    const orderdata = await ordermodel.findById(orderId);


    if (orderdata) {
     
      if (orderdata.status !== 'Delivered') {
      
        orderdata.status = 'Canceled'; 
        await orderdata.save();  

       
        res.status(200).json({ message: 'Order canceled successfully' });
      } else {
      
        res.status(400).json({ message: 'Order cannot be canceled at this stage' });
      }
    } else {
 
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const orderData = await ordermodel.findById(orderId);

    if (!orderData) {
      return res.status(404).json({ error: "Order not found" });
    }

    await ordermodel.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.listallorders=async(req,res)=>{
  try {
 const orders=await ordermodel.find({})
 res.status(200).json({ success: true ,data:orders});

  } catch (error) {
    res.status(401).json(error)
  }
}

exports.updatestatus=async(req,res)=>{
  try {
    await ordermodel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.status(200).json({ success: true ,message:"status updated"});
    
  } catch (error) {
    res.status(401).json(error)
  }
}