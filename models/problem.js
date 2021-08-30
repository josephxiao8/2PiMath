const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: [true],
  },
  answer: {
    type: String,
    required: [true],
  },
  problemTitle: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model("problem", problemSchema);
