const express = require("express");

const { runProblem } = require("../controller/runController"); 
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/problem/run", auth, runProblem); 

module.exports = router;
