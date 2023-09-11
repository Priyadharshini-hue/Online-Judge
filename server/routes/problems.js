const express = require("express");

const { addProblem, getProblems } = require("../controller/problemController");

const router = express.Router();

router.post("/addProblem", addProblem);
router.get("/getProblems", getProblems);

module.exports = router;
