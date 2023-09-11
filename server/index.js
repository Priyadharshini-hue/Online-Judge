const express = require("express");
const cors = require("cors");

const db = require("./database/dbConnection");
const userRoutes = require("./routes/userAuth");
const problemRoutes = require("./routes/problems");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", problemRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started...");
});
