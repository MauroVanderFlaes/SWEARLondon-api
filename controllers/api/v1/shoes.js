//require the shoe model
const Shoe = require("../../../models/Shoe");

//create a new shoe
const create = async (req, res) => {
  //get size, color, price, quantity, user from the request body
  let {
    size,
    laces_color,
    sole_bottom_color,
    sole_top_color,
    inside_color,
    outside_1_color,
    outside_2_color,
    outside_3_color,
    laces_material,
    sole_bottom_material,
    sole_top_material,
    inside_material,
    outside_1_material,
    outside_2_material,
    outside_3_material,
    price,
    quantity,
    username,
    user_mail,
    reference_number,
  } = req.body;

  // Input validation
  if (
    !laces_color ||
    !sole_bottom_color ||
    !sole_top_color ||
    !inside_color ||
    !outside_1_color ||
    !outside_2_color ||
    !outside_3_color ||
    !laces_material ||
    !sole_bottom_material ||
    !sole_top_material ||
    !inside_material ||
    !outside_1_material ||
    !outside_2_material ||
    !outside_3_material ||
    !username ||
    !user_mail
  ) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  let shoe = new Shoe({
    size,
    laces_color,
    sole_bottom_color,
    sole_top_color,
    inside_color,
    outside_1_color,
    outside_2_color,
    outside_3_color,
    laces_material,
    sole_bottom_material,
    sole_top_material,
    inside_material,
    outside_1_material,
    outside_2_material,
    outside_3_material,
    price,
    quantity,
    username,
    user_mail,
    reference_number,
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
          id: shoe._id,
          size: shoe.size,
          laces_color: shoe.laces_color,
          sole_bottom_color: shoe.sole_bottom_color,
          sole_top_color: shoe.sole_top_color,
          inside_color: shoe.inside_color,
          outside_1_color: shoe.outside_1_color,
          outside_2_color: shoe.outside_2_color,
          outside_3_color: shoe.outside_3_color,
          laces_material: shoe.laces_material,
          sole_bottom_material: shoe.sole_bottom_material,
          sole_top_material: shoe.sole_top_material,
          inside_material: shoe.inside_material,
          outside_1_material: shoe.outside_1_material,
          outside_2_material: shoe.outside_2_material,
          outside_3_material: shoe.outside_3_material,
          price: shoe.price,
          quantity: shoe.quantity,
          username: shoe.username,
          user_mail: shoe.user_mail,
          reference_number: shoe.reference_number,
          date: shoe.date,
          status: shoe.status,
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

const index = async (req, res) => {
  try {
    let shoes;

    if (req.query.sortby === "date") {
      shoes = await Shoe.find({}).sort({ date: 1 }); // Assuming 'date' is the field you want to sort by
    } else {
      shoes = await Shoe.find({});
    }

    const shoeData = shoes.map((shoe) => ({
      id: shoe._id,
      size: shoe.size,
      laces_color: shoe.laces_color,
      sole_bottom_color: shoe.sole_bottom_color,
      sole_top_color: shoe.sole_top_color,
      inside_color: shoe.inside_color,
      outside_1_color: shoe.outside_1_color,
      outside_2_color: shoe.outside_2_color,
      outside_3_color: shoe.outside_3_color,
      laces_material: shoe.laces_material,
      sole_bottom_material: shoe.sole_bottom_material,
      sole_top_material: shoe.sole_top_material,
      inside_material: shoe.inside_material,
      outside_1_material: shoe.outside_1_material,
      outside_2_material: shoe.outside_2_material,
      outside_3_material: shoe.outside_3_material,
      price: shoe.price,
      quantity: shoe.quantity,
      username: shoe.username,
      user_mail: shoe.user_mail,
      reference_number: shoe.reference_number,
      date: shoe.date,
      status: shoe.status,
    }));

    res.json({
      status: "success",
      message: "GET all shoes",
      data: shoeData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const indexId = async (req, res) => {
  let id = req.params.id;
  let shoe = await Shoe.findById({ _id: id });

  const shoeData = {
    id: shoe._id,
    size: shoe.size,
    laces_color: shoe.laces_color,
    sole_bottom_color: shoe.sole_bottom_color,
    sole_top_color: shoe.sole_top_color,
    inside_color: shoe.inside_color,
    outside_1_color: shoe.outside_1_color,
    outside_2_color: shoe.outside_2_color,
    outside_3_color: shoe.outside_3_color,
    laces_material: shoe.laces_material,
    sole_bottom_material: shoe.sole_bottom_material,
    sole_top_material: shoe.sole_top_material,
    inside_material: shoe.inside_material,
    outside_1_material: shoe.outside_1_material,
    outside_2_material: shoe.outside_2_material,
    outside_3_material: shoe.outside_3_material,
    price: shoe.price,
    quantity: shoe.quantity,
    username: shoe.username,
    user_mail: shoe.user_mail,
    reference_number: shoe.reference_number,
    date: shoe.date,
    status: shoe.status,
  };

  res.json({
    status: "success",
    message: "GET one shoe by ID",
    data: shoeData,
  });
};

const update = async (req, res) => {
  // Get the shoe id from the request parameters
  let id = req.params.id; // Assuming the id is part of the URL parameters

  // Get the status from the request body
  let { status } = req.body;

  // Input validation
  if (!status) {
    return res.status(400).json({
      status: "error",
      message: "Missing required 'status' field",
    });
  }

  try {
    // Attempt to update the shoe
    const result = await Shoe.updateOne(
      { _id: id },
      {
        $set: {
          status,
        },
      }
    );

    // Check if the document was found and updated
    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      // Respond with success
      res.json({
        status: "success",
        message: "Shoe status updated successfully!",
        data: [
          {
            status,
          },
        ],
      });
    } else {
      // Respond with an error if the document was not found
      res.status(404).json({
        status: "error",
        message: "Shoe not found",
      });
    }
  } catch (error) {
    // Handle the error
    console.error("Error updating shoe:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  let id = req.params.id;
  let s = await Shoe.findOneAndDelete({
    _id: id,
  });

  res.json({
    status: "success",
    message: "DELETE a shoe",
    data: [
      {
        shoe: s,
      },
    ],
  });
};

//export the create function
module.exports.create = create;
module.exports.index = index;
module.exports.indexId = indexId;
module.exports.update = update;
module.exports.destroy = destroy;