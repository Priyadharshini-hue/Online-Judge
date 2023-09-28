  const { generateFile, generateInput } = require("../utilities/generateFile");
  const { executeCode } = require("../utilities/executeFile"); 

  const runProblem = async (req, res) => {
    const { language, code, testCase } = req.body;

    if (code === undefined) {
      return res.status(404).json({ success: false, error: "Code not found" });
    }
    let output;
    try {
      const filepath = await generateFile(language, code);
      const inputPath = await generateInput(testCase.input);

      const rawOutput = await executeCode(filepath, language, inputPath);
      output = rawOutput.replace(/\r\n/g, "\n");
      
      if (output != testCase.output) {
        return res
          .status(201)
          .json({ success: false, error: "Test case failed",  });
      }
      return res.json({ output, message: "Compilation success" });
    } catch (err) {
      res.status(500).json({ err });
    }
  };

  module.exports = { runProblem };
