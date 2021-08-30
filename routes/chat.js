const express = require("express");
const routerChat = express.Router();
const {
  getMessages,
  createMessages,
  updateMessages,
  deleteMessages,
  deleteAll,
} = require("../controllers/chat");

routerChat.get("/", getMessages);
routerChat.post("/", createMessages);
routerChat.patch("/", updateMessages);
routerChat.delete("/", deleteMessages);
routerChat.delete("/reset", deleteAll);

module.exports = routerChat;
