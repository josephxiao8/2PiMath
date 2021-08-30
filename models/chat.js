const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true],
  },
  msg: {
    type: String,
    required: [true],
  },
  socketId: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model("chat", messageSchema);
