const problemModel = require("../model/problemModel");

const addProblem = async (req, res) => {
  const { title, statement, difficulty, sampleInput, sampleOutput } = req.body;
  const createdBy = req.user._id;

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
        createdBy,
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
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProblem = async (req, res) => {
  try {
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const problem = await problemModel.findById(req.params.problemId);
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProblem = async (req, res) => {
  try {
    const problem = await problemModel.findByIdAndUpdate(
      req.params.problemId,
      req.body,
      { new: true }
    );
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.send(problem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProblem = async (req, res) => {
  const problem = await problemModel.findByIdAndDelete(req.params.problemId);
  try {
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
};
