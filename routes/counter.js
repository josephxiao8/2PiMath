const express = require("express");
const routerCounter = express.Router();
const {
  getCounter,
  updateCounter,
  updateProblem,
} = require("../controllers/counter");

routerCounter.get("/", getCounter);
routerCounter.patch("/", updateCounter);
routerCounter.patch("/problem", updateProblem);

module.exports = routerCounter;
