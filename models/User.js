//require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  user_mail: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

//export the model
module.exports = mongoose.model("user", UserSchema);
