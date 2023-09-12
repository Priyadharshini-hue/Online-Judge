const express = require("express");

const { addProblem, getProblems } = require("../controller/problemController");

const router = express.Router();

router.post("/problems/add", addProblem);
router.get("/problems/list", getProblems);

module.exports = router;
