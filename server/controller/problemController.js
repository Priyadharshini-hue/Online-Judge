const problemModel = require("../model/problemModel");

// create problem
const addProblem = async (req, res) => {
  const { title, statement, difficulty, testCases } = req.body;
  const createdBy = req.user._id;

  try {
    const problem = await problemModel.findOne({ title });

    if (problem) {
      res.status(201).json({ message: "Problem exists already", problem });
    } else {
      const problem = await problemModel.create({
        title,
        statement,
        difficulty,
        testCases,
        createdBy,
      });
      res.json({ message: "Problem created successfully", data: problem });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblems = async (req, res) => {
  try {
    const problems = await problemModel.find();
    res.status(200).json({ data: problems });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProblem = async (req, res) => {
  try {
    const problem = await problemModel.findById(req.params.problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProblem = async (req, res) => {
  const { title, statement, difficulty, testCases } = req.body;
  try {
    const problem = await problemModel.findByIdAndUpdate(
      req.params.problemId,
      { title, statement, difficulty, testCases },
      { new: true }
    );
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem edited successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete problem
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
