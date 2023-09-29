const { generateFile, generateInput } = require("../utilities/generateFile");
const { executeCode } = require("../utilities/executeFile");
const problemModel = require("../model/problemModel");

const submitProblem = async (req, res) => {
  const { language, code, problemId } = req.body;

  const problem = await problemModel.findById(problemId);
  const testCases = problem.testCases;
  let allTestCasesPassed = true;

  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Code not found" });
  }
  let output;
  try {
    const filepath = await generateFile(language, code);

    for (const testCase of testCases) {
      const inputPath = await generateInput(testCase.input);
      const rawOutput = await executeCode(filepath, language, inputPath);
      output = rawOutput.replace(/\r\n/g, "\n").trim();
      console.log(output);
      if (output !== testCase.output) {
        allTestCasesPassed = false;
        break;
      }
    }
    if (allTestCasesPassed) {
      res.json({ output, message: "All test cases passed" });
    } else {
      res
        .status(201)
        .json({ output, success: false, error: "Test cases failed" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = { submitProblem };
