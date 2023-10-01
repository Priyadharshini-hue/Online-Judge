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
  const fileName = format === "java" ? "Main.java" : `${jobId}.${format}`;
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
      // executeCmd = `javac -d ${outputDirectory} ${filePath} && java -cp ${outputDirectory} ${jobId} < ${inputPath}`;
      executeCmd = `docker exec ${dockerContainerId} sh -c "javac -d app/outputs /app/codes/${jobId}.java  && java -cp app/outputs ${jobId} < /app/inputs/${
        path.basename(inputPath).split(".")[0]
      }.txt"`;
      break;
    case "py":
      // executeCmd = `python ${filePath} < ${inputPath}`;
      executeCmd = `docker exec ${dockerContainerId} sh -c "python -u /app/codes/${jobId}.py < /app/inputs/${
        path.basename(inputPath).split(".")[0]
      }.txt"`;
      break;
    case "c":
      // executeCmd = `gcc ${filePath} -o ${outputPath} && ${outputPath} < ${inputPath}`;
      executeCmd = `docker exec ${dockerContainerId} sh -c "gcc /app/codes/${jobId}.c -o /app/outputs/${jobId}.exe && /app/outputs/${jobId}.exe < /app/inputs/${
        path.basename(inputPath).split(".")[0]
      }.txt"`;
      break;
    case "cpp":
      // executeCmd = `g++ ${filePath} -o ${outputPath} && ${outputPath} < ${inputPath}`;
      executeCmd = `docker exec ${dockerContainerId} sh -c "g++ /app/codes/${jobId}.cpp -o /app/outputs/${jobId}.exe && /app/outputs/${jobId}.exe < /app/inputs/${
        path.basename(inputPath).split(".")[0]
      }.txt"`;
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

let dockerContainerId;

const startDockerContainer = (dockerImage) => {
  // Define the Docker command to start the container
  const dockerCmd = `docker run -d -v ${outputDirectory}:/app/outputs -v ${dirCodes}:/app/codes -v ${dirInput}:/app/inputs ${dockerImage}`;

  return new Promise((resolve, reject) => {
    exec(dockerCmd, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        dockerContainerId = stdout.trim(); // Store the container ID
        // console.log(dockerContainerId);
        resolve();
      }
    });
  });
};

const stopDockerContainer = () => {
  if (!dockerContainerId) {
    return Promise.resolve(); // No container to stop
  }

  // Define the Docker command to stop and remove the container
  const dockerCmd = `docker stop ${dockerContainerId} && docker rm ${dockerContainerId}`;

  return new Promise((resolve, reject) => {
    exec(dockerCmd, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const submitProblem = async (req, res) => {
  const { language, code, problemId, userId, submittedAt } = req.body;

  if (code === undefined) {
    return res.json({ success: false, message: "Code not found" });
  }

  let submission, submissionStatus, errorInfo;

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

    // Start the Docker container at the beginning
    const dockerImage = "img"; // Replace with your Docker image
    await startDockerContainer(dockerImage);

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const inputPath = await generateInput(testCase.input);

      const executionStartTime = performance.now();

      const rawOutput = await executeCode(filepath, language, inputPath);

      const executionEndTime = performance.now();
      const executionTime = executionEndTime - executionStartTime;

      const output = rawOutput.replace(/\r\n/g, "\n").trim();

      // console.log(rawOutput + "" + output);

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
    await stopDockerContainer();
    return res.json({ message: "Code Accepted" });

  } catch (error) {
    // console.log(error);
    errorInfo = {
      message: error.message || "Compilation error",
      stack: error.stack || "",
    };
    await stopDockerContainer();
    if (submission) {
      submission.status = `Error: ${errorInfo.message}`;
      await submission.save();
      return res.json({ message: errorInfo.message });
    }

    return res.json({ message: errorInfo.message, error });
  }
};

module.exports = { submitProblem };
