const express = require("express");
const db = require("./database/dbConnection");
const cors = require("cors");

const app = express();

const addProblem = require("./routes/problem/addProblem");
const getProblems = require("./routes/problem/problemList");

app.use(cors());
app.use(express.json());

app.use("/", addProblem);
app.use("/", getProblems);

app.listen(process.env.PORT, () => {
  console.log("Server started...");
});