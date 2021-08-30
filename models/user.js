const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true],
  },
  socketId: {
    type: String,
    required: [true],
  },
  submissions: {
    type: Array,
    default: [],
  },
  solved: {
    type: Boolean,
    required: [true],
  },
});

module.exports = mongoose.model("user", userSchema);
