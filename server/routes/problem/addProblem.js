const express = require("express");
const router = express.Router();

const Problem = require("../../model/Problem");

router.post("/addProblem", async (req, res) => {
  const {
    problemTitle,
    problemStatement,
    problemDifficulty,
    sampleInput,
    sampleOutput,
  } = req.body;

  try {
    const problem = await Problem.findOne({ problemTitle });
    console.log("Fetched problems:", problem);  

    if (problem) {
      res.status(201).json({ message: "Problem ", problem });
    } else {
      const problem = await Problem.create({
        problemTitle,
        problemStatement,
        problemDifficulty,
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
