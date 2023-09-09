const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  problemTitle: {
    type: String,
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  problemDifficulty: {
    type: String,
    required: true,
  },
  sampleInput: {
    type: String,
    required: true,
  },
  sampleOutput: {
    type: String,
    required: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;