import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Appetizers",
      "Main Course",
      "Desserts",
      "Beverages",
      "Salads",
      "Snacks",
      "Kids Menu",
      "Chef’s Specials",
    ],
    default: "Main Course",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
