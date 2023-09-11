const problemModel = require("../model/problemModel");

const addProblem = async (req, res) => {
  const { title, statement, difficulty, sampleInput, sampleOutput } = req.body;

  try {
    const problem = await problemModel.findOne({ title });

    if (problem) {
      res.status(201).json({ message: "Problem ", problem });
    } else {
      const problem = await problemModel.create({
        title,
        statement,
        difficulty,
        sampleInput,
        sampleOutput,
      });
      res.json({ success: true, message: "Problem created", data: problem });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const getProblems = async (req, res) => {
  try {
    const problems = await problemModel.find();
    res.status(200).json({ success: true, data: problems });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        error: "Internal Server Error",
        message: err.message,
      });
  }
};

module.exports = { addProblem, getProblems };
