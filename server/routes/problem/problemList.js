const express = require("express");
const router = express.Router();

const Problem = require("../../model/Problem");

router.get("/getProblems", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
