const problem = require("../models/problem");

const getProblems = async (req, res) => {
  try {
    const problems = await problem.find({});
    return res.status(200).json({ problems });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

module.exports = { getProblems };
