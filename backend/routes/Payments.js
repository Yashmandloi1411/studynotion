const express = require("express");
const router = express.Router();

// import controller
const { capturePayment, verifySignature } = require("../controllers/Payments");

const { auth, isStudent } = require("../middlewares/auth");

// route ko mape karo controller sa

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
