const express = require("express");

const { addProblem, getProblems } = require("../controller/problemController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/problems/add", auth, addProblem);
router.get("/problems/list", auth, getProblems);

module.exports = router;
