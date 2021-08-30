const express = require("express");
const routerProblemBoard = express.Router();
const { getProblems } = require("../controllers/problemBoard");

routerProblemBoard.get("/", getProblems);

module.exports = routerProblemBoard;
