const user = require("../models/user");

const resetUser = async (req, res) => {
  try {
    const { username } = req.body;
    const res1 = await user.findOne({ username: username });
    const updatedUser = await user.findOneAndUpdate(
      { username: username },
      { submissions: [], solved: false },
      { new: true }
    );
    return res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

const getScoreboard = async (req, res) => {
  try {
    const userFound = await user.find({});
    if (!userFound) throw new Error();
    res.status(200).json({ userFound: userFound });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { username } = req.params;
    const userFound = await user.findOne({ username: username });
    if (!userFound) throw new Error();
    res.status(200).json({ userFound: userFound });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, query, verdict } = req.body;
    const res1 = await user.findOne({ username: username });
    const res2 = await res1.submissions;
    const res3 = await res1.solved;
    await res2.push({ query, verdict });
    const updatedUser = await user.findOneAndUpdate(
      { username: username },
      { submissions: res2, solved: res3 || verdict },
      { new: true }
    );
    return res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, socketId, submissions, solved } = req.body;
    const newUser = await user.create({
      username,
      socketId,
      submissions,
      solved,
    });
    res.status(200).json({ newUser });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { socketId } = req.body;
    const userDeleted = await user.findOneAndDelete({ socketId: socketId });
    if (!userDeleted) throw new Error();
    res.status(200).json({ userDeleted });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  resetUser,
  getScoreboard,
  getUserInfo,
  updateUser,
  createUser,
  deleteUser,
};
