const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  usersSolved: {
    type: Number,
    required: [true],
  },
  usersTotal: {
    type: Number,
    required: [true],
  },
  curProblem: {
    type: Number,
    required: [true],
  },
  totalProblems: {
    type: Number,
    required: [true],
  },
});

module.exports = mongoose.model("counter", counterSchema);
