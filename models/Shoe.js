//require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create a schema for shoe shoes, all fields are required except material, laces & sole
const ShoeSchema = new Schema({
  size: { type: Number, required: false },
  laces_color: { type: String, required: true },
  sole_bottom_color: { type: String, required: true },
  sole_top_color: { type: String, required: true },
  inside_color: { type: String, required: true },
  outside_1_color: { type: String, required: true },
  outside_2_color: { type: String, required: true },
  outside_3_color: { type: String, required: true },
  laces_material: { type: String, required: true },
  sole_bottom_material: { type: String, required: true },
  sole_top_material: { type: String, required: true },
  inside_material: { type: String, required: true },
  outside_1_material: { type: String, required: true },
  outside_2_material: { type: String, required: true },
  outside_3_material: { type: String, required: true },
  price: { type: Number, required: false },
  quantity: { type: Number, required: false },
  username: { type: String, required: true },
  user_mail: { type: String, required: true },
  status: { type: String, default: "To be produced" },
  reference_number: { type: Number, required: false },
  date: { type: Date, default: Date.now },
});

//export the model
module.exports = mongoose.model("shoes", ShoeSchema);
