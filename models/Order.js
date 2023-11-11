//require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create a schema for shoe orders, all fields are required except material, laces & sole
const OrderSchema = new Schema({
  brand: { type: String, required: true },
  size: { type: Number, required: true },
  material: { type: String, required: false },
  laces: { type: String, required: false },
  sole: { type: String, required: false },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  user: { type: String, required: true },
});

//export the model
module.exports = mongoose.model("Orders", OrderSchema);
