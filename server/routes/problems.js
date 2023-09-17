const express = require("express");

const {
  addProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
} = require("../controller/problemController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/problems/add", auth, addProblem);
router.get("/problems/list", auth, getProblems);
router.get("/problems/:problemId", auth, getProblem);
router.get("/problems/edit/:problemId", auth, getProblem);
router.put("/problems/edit/:problemId", auth, updateProblem);
router.delete("/problems/:problemId", auth, deleteProblem);

module.exports = router;
