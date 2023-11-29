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

const updatePassword = async (req, res) => {
  //update the password of a certain user by id
  let id = req.params.id;
  let { password } = req.body;

  // Input validation
  if (!password) {
    return res.status(400).json({
      status: "error",
      message: "Missing required 'password' field",
    });
  }

  //update the password
  try {
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password,
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

//export the create function
module.exports.create = create;
module.exports.updatePassword = updatePassword;