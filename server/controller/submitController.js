const problemModel = require("../model/problemModel");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const userModel = require("../model/userModel");
const { v4: uuid } = require("uuid");
const CodeSubmission = require("../model/SubmissionModel");

const outputDirectory = path.join(__dirname, "../outputs");
const dirCodes = path.join(__dirname, "../codes");
const dirInput = path.join(__dirname, "../inputs");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

if (!fs.existsSync(dirInput)) {
  fs.mkdirSync(dirInput, { recursive: true });
}

async function generateFile(format, code) {
  const jobId = uuid();
  let fileName;
  if (format === "java") {
    fileName = "Main.java";
  } else {
    fileName = `${jobId}.${format}`;
  }
  const filepath = path.join(dirCodes, fileName);
  await fs.writeFileSync(filepath, code);
  return filepath;
}

async function generateInput(input) {
  const jobId = uuid();
  const fileName = `${jobId}.txt`;
  const filepath = path.join(dirInput, fileName);
  await fs.writeFileSync(filepath, input);
  return filepath;
}

const executeCode = (filePath, language, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  let outputPath;
  if (language == "java") {
    outputPath = path.join(outputDirectory, `${jobId}.class`);
  } else {
    outputPath = path.join(outputDirectory, `${jobId}.exe`);
  }

  let executeCmd;

  switch (language) {
    case "java":
      executeCmd = `javac -d ${outputDirectory} ${filePath} && java -cp ${outputDirectory} ${jobId} < ${inputPath}`;
      break;
    case "py":
      executeCmd = `python ${filePath} < ${inputPath}`;
      break;
    case "c":
      executeCmd = `gcc ${filePath} -o ${outputPath} && ${outputPath} < ${inputPath}`;
      break;
    case "cpp":
      executeCmd = `g++ ${filePath} -o ${outputPath} && ${outputPath} < ${inputPath}`;
      break;
    default:
      return Promise.reject(`Unsupported language: ${language}`);
  }

  return new Promise((resolve, reject) => {
    exec(executeCmd, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });
  });
};

const submitProblem = async (req, res) => {
  const { language, code, problemId, userId, submittedAt } = req.body;

  if (code === undefined) {
    return res.json({ success: false, message: "Code not found" });
  }

  let submission, submissionStatus;
  try {
    const problem = await problemModel.findById(problemId);
    const testCases = problem.testCases;

    const user = await userModel.findById(userId);

    const filepath = await generateFile(language, code);

    submission = await CodeSubmission.create({
      code,
      user: user.name,
      problem: problem.title,
      language,
      submittedAt,
      status: "Pending",
    });

    const scoringSystem = {
      easy: 10,
      medium: 20,
      difficult: 30,
    };

    const userScore = scoringSystem[problem.difficulty];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const inputPath = await generateInput(testCase.input);

      const executionStartTime = performance.now();

      const rawOutput = await executeCode(filepath, language, inputPath);

      const executionEndTime = performance.now();
      const executionTime = executionEndTime - executionStartTime;

      const output = rawOutput.replace(/\r\n/g, "\n").trim();

      if (output !== testCase.output) {
        submissionStatus = `Test cases ${i + 1} failed`;
        return res.json({
          message: `Test cases ${i + 1} failed`,
        });
      }

      if (executionTime > testCase.timeTaken) {
        submissionStatus = `Time limit exceeded for the test case ${i + 1}`;
        return res.json({
          message: `Time limit exceeded for the test case ${i + 1}`,
        });
      }
    }

    submissionStatus = "Code Accepted";
    submission.status = submissionStatus;
    await submission.save();

    if (!user.solvedProblems.includes(problemId)) {
      user.solvedProblems.push(problemId);
      user.score += userScore;
      await user.save();
    }

    return res.json({ message: "Code Accepted" });
  } catch (err) {
    submission.status = "Compilation error";
    await submission.save();
    return res.json({ message: "Compilation error" });
  }
};

module.exports = { submitProblem };
