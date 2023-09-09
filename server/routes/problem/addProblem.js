const express = require("express");
const router = express.Router();

const Problem = require("../../model/Problem");

router.post("/addProblem", async (req, res) => {
  const { title, statement, difficulty, sampleInput, sampleOutput } = req.body;

  try {
    const problem = await Problem.findOne({ title }); 

    if (problem) {
      res.status(201).json({ message: "Problem ", problem });
    } else {
      const problem = await Problem.create({
        title,
        statement,
        difficulty,
        sampleInput,
        sampleOutput,
      });
      res.json({ message: "Problem created successfully", problem });
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
