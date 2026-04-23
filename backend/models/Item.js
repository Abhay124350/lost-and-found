import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ["Lost", "Found"],
    required: true
  },
  location: String,
  date: {
    type: Date,
    default: Date.now
  },
  contactInfo: String,  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

export default Item;