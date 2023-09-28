const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputDirectory = path.join(__dirname, "../output");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
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

module.exports = { executeCode };
