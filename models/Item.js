const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  done: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("items", ItemSchema);
