const express = require("express");
const router = express.Router();

const Problem = require("../../model/problemModel");

router.get("/getProblems", async (req, res) => {
  try {
    const problems = await problemModel.find();
    res.json(problems);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
