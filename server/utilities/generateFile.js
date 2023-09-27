const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "../codes");
const dirInput = path.join(__dirname, "../inputs");

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

module.exports = { generateFile, generateInput };
