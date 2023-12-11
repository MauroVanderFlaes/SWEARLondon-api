//require the user model
const User = require("../../../models/User");

const jwt = require('jsonwebtoken');

//require bcrypt
const bcrypt = require("bcrypt");
const salt = 12;

//create a new user
const create = async (req, res) => {
  //get username, user_mail, password from the request body
  let { user_mail, password } = req.body;

  // Input validation
  if (!user_mail || !password) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  //hash the password
  hashedPassword = await bcrypt.hash(password, salt);

  let user = new User({
    user_mail,
    password: hashedPassword,
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

const updatePassword = async (req, res) => {
  //update the password of a certain user by id
  let mail = req.params.mail;
  let { password } = req.body;

  // Input validation
  if (!password) {
    return res.status(400).json({
      status: "error",
      message: "Missing required 'password' field",
    });
  }

  //hash the password
  hashedPassword = await bcrypt.hash(password, salt);

  //update the password
  try {
    await User.updateOne(
      { user_mail: mail },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error updating password",
    });
  }
};


const login = async (req, res) => {
  //get username, user_mail, password from the request body
  let { user_mail, password } = req.body;

  // Input validation
  if (!user_mail || !password) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  //find the user
  let user = await User.findOne({ user_mail });

  //check if the user exists
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  //check if the password is correct
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      status: "error",
      message: "Incorrect password",
    });
  }

  // Create JWT token
  const token = jwt.sign({ user_id: user._id, user_mail: user.user_mail, admin: user.admin }, 'your_secret_key', { expiresIn: '1h' });

  //return the user along with the token
  return res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: { user, token }, // Include the token in the response
  });


};


//export the create function
module.exports.create = create;
module.exports.updatePassword = updatePassword;
module.exports.login = login;
