const express = require("express");
const routerUser = express.Router();
const {
  resetUser,
  getScoreboard,
  getUserInfo,
  updateUser,
  createUser,
  deleteUser,
} = require("../controllers/user");

routerUser.patch("/reset", resetUser);
routerUser.get("/scoreboard", getScoreboard);
routerUser.get("/:username", getUserInfo);
routerUser.patch("/", updateUser);
routerUser.post("/", createUser);
routerUser.delete("/", deleteUser);

module.exports = routerUser;
