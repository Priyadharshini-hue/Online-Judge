const express = require("express");

const {
  fetchSubmissions,
} = require("../controller/submissionHistoryController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/submissions/history", auth, fetchSubmissions);

module.exports = router;
