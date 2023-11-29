//require the user model
const User = require("../../../models/User");

//create a new user
const create = async (req, res) => {
  //get username, user_mail, password from the request body
  let { username, user_mail, password } = req.body;

  // Input validation
  if (!username || !user_mail || !password) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  let user = new User({
    username,
    user_mail,
    password,
  });

  //save the user
  try {
    user = await user.save();
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error creating user",
    });
  }
};

//export the create function
module.exports.create = create;

