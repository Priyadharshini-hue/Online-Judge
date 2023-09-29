const express = require("express");

const { runProblem } = require("../controller/runController");
const { submitProblem } = require("../controller/submitController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/problem/run", auth, runProblem);
router.post("/problem/submit", auth, submitProblem);

module.exports = router;
