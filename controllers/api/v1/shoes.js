//require the shoe model
const Shoe = require("../../../models/Shoe");

//create a new shoe
const create = async (req, res) => {
  //get brand, size, color, price, quantity, user from the request body
  let {
    brand,
    size,
    laces,
    sole_bottom,
    sole_top,
    inside,
    outside_1,
    outside_2,
    outside_3,
    price,
    quantity,
    user,
  } = req.body;

  // Input validation
  if (
    !brand ||
    !size ||
    !laces ||
    !sole_bottom ||
    !sole_top ||
    !inside ||
    !outside_1 ||
    !outside_2 ||
    !outside_3 ||
    !price ||
    !quantity ||
    !user
  ) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  let shoe = new Shoe({
    brand,
    size,
    laces,
    sole_bottom,
    sole_top,
    inside,
    outside_1,
    outside_2,
    outside_3,
    price,
    quantity,
    user,
  });

  try {
    // Attempt to save the shoe
    await shoe.save();

    // Respond with success
    res.json({
      status: "success",
      message: "Shoe created successfully!",
      data: [
        {
          brand: shoe.brand,
          size: shoe.size,
          laces: shoe.laces,
          sole_bottom: shoe.sole_bottom,
          sole_top: shoe.sole_top,
          inside: shoe.inside,
          outside_1: shoe.outside_1,
          outside_2: shoe.outside_2,
          outside_3: shoe.outside_3,
          price: shoe.price,
          quantity: shoe.quantity,
          user: shoe.user,
        },
      ],
    });
  } catch (error) {
    // Handle the error
    console.error("Error creating shoe:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};



//export the create function
module.exports.create = create;