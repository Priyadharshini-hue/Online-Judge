const express = require("express");
const db = require("./database/dbConnection");
const cors = require("cors");

const app = express();

const addProblem = require("./routes/problem/addProblem");

app.use(cors());
app.use(express.json());

app.use("/", addProblem);

app.listen(process.env.PORT, () => {
  console.log("Server started...");
});