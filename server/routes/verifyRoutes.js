const express = require("express");
const router = express.Router();
const { verifyCandidate } = require("../controllers/verifyController");

router.post("/verify-candidate", verifyCandidate);

module.exports = router;