const chat = require("../models/chat");

const getMessages = async (req, res) => {
  try {
    const messages = await chat.find({});
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ msg: "error" });
  }
};

const createMessages = async (req, res) => {
  try {
    const { userId, msg, socketId } = req.body;
    const newMsg = await chat.create({
      userId: userId,
      msg: msg,
      socketId: socketId,
    });
    res.status(200).json({ newMsg });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const updateMessages = async (req, res) => {
  try {
    const { msgId, msgUpdate } = req.body;
    const msgUpdated = await chat.findOneAndUpdate(
      { _id: msgId },
      { msg: msgUpdate },
      { new: true }
    );
    res.status(200).json({ msgUpdated });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const deleteMessages = async (req, res) => {
  try {
    const { msgId } = req.body;
    const msgDeleted = await chat.findOneAndDelete({ _id: msgId });
    res.status(200).json({ msgDeleted });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const deleteAll = async (req, res) => {
  try {
    const msgDeleted = await chat.deleteMany({});
    res.status(200).json({ msgDeleted });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  getMessages,
  createMessages,
  updateMessages,
  deleteMessages,
  deleteAll,
};
