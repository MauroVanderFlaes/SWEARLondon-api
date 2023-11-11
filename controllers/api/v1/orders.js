//require the order model
const Order = require("../../models/Order");

//create a new order
const create = async (req, res) => {
  //get brand, size, color, price, quantity, user from the request body
  let { brand, size, color, price, quantity, user } = req.body;

  // Input validation
  if (!brand || !size || !color || !price || !quantity || !user) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  let order = new Order({
    brand,
    size,
    color,
    price,
    quantity,
    user,
  });

  try {
    // Attempt to save the order
    await order.save();

    // Respond with success
    res.json({
      status: "success",
      message: "Order created successfully!",
      data: [
        {
          brand: order.brand,
          size: order.size,
          color: order.color,
          price: order.price,
          quantity: order.quantity,
          user: order.user,
        },
      ],
    });
  } catch (error) {
    // Handle the error
    console.error("Error creating order:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

//export the create function
module.exports.create = create;