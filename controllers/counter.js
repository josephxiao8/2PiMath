const { findOneAndUpdate } = require("../models/counter");
const counter = require("../models/counter");

const getCounter = async (req, res) => {
  try {
    const counterGotten = await counter.findOne({});
    return res.status(200).json({ counterGotten });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

//updates usersSolved and usersTotal
const updateCounter = async (req, res) => {
  try {
    const { action } = req.body;
    const { usersSolved, usersTotal } = await counter.findOne({});
    let a = 0;
    let b = 0;
    if (action === "connect") b++;
    else if (action === "solve") a++;
    else if (action === "disconnect solved") {
      a--;
      b--;
    } else if (action === "disconnect") b--;
    else if (action === "reset") {
      a = -1 * usersSolved;
    } else throw new Error();
    const counterUpdated = await counter.findOneAndUpdate(
      {},
      { usersSolved: usersSolved + a, usersTotal: usersTotal + b },
      { new: true }
    );
    res.status(200).json({ counterUpdated });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

//updates curProblem and totalProblems
const updateProblem = async (req, res) => {
  try {
    const { totalProblems } = await counter.findOne({});
    const newProblem = Math.floor(Math.random() * totalProblems);
    const problemUpdated = await counter.findOneAndUpdate(
      {},
      { usersSolved: 0, curProblem: newProblem },
      { new: true }
    );
    return res.status(200).json({ problemUpdated });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  getCounter,
  updateCounter,
  updateProblem,
};
