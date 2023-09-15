const express = require("express");

const {
  addProblem,
  getProblems,
  deleteProblem,
} = require("../controller/problemController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/problems/add", auth, addProblem);
router.get("/problems/list", auth, getProblems);
router.delete("/problems/:problemId", auth, deleteProblem);

module.exports = router;
