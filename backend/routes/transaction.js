const express = require("express");
const router = express.Router();
const { getAllTransactions, getTransactionDetail, getUserTransactions, markTransactionAsRead } = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllTransactions);
router.get("/my-transactions", verifyToken, getUserTransactions); 
router.get("/:id", getTransactionDetail);
router.patch("/:id/read", verifyToken, markTransactionAsRead);

module.exports = router;
