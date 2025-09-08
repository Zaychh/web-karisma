// routes/payment.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createPayment,
  handleNotification,
  checkPaymentStatus,
  getUserTransactions,
} = require("../controllers/paymentController");

// Route untuk create payment (butuh authentication)
router.post("/payment", verifyToken, createPayment);

// Route untuk handle notification dari Midtrans (TIDAK perlu auth - dipanggil oleh Midtrans)
router.post("/payment/notification", handleNotification);

// Route untuk check payment status (butuh authentication)
router.get("/payment/status/:orderId", verifyToken, checkPaymentStatus);

// Route untuk get user transaction history (butuh authentication)
router.get("/payment/history", verifyToken, getUserTransactions);

// Route untuk cancel payment (optional - jika dibutuhkan)
router.post("/payment/cancel/:orderId", verifyToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Update transaction status ke cancelled
    const updateQuery = `
            UPDATE transactions 
            SET transaction_status = 'cancelled', updated_at = NOW()
            WHERE midtrans_order_id = ? AND user_id = ? AND transaction_status = 'pending'
        `;

    const [result] = await global.db.execute(updateQuery, [orderId, user_id]);

    if (result.affectedRows > 0) {
      // Update enrollment juga
      const enrollmentQuery = `
                UPDATE enrollments e
                JOIN transactions t ON e.transaction_id = t.id
                SET e.status = 'cancelled', e.updated_at = NOW()
                WHERE t.midtrans_order_id = ? AND t.user_id = ?
            `;

      await global.db.execute(enrollmentQuery, [orderId, user_id]);

      res.json({
        success: true,
        message: "Payment cancelled successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaction not found or cannot be cancelled",
      });
    }
  } catch (error) {
    console.error("❌ Cancel payment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel payment",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// Route untuk ambil detail transaksi per program (butuh authentication)
router.get("/payment/detail/:programId", verifyToken, async (req, res) => {
  try {
    const { programId } = req.params;
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const query = `
  SELECT 
      t.order_id,
      u.name as buyer_name,
      p.program_id,        
      p.title as program_name,
      p.categories,
      t.transaction_time,
      t.payment_method,
      t.gross_amount,
      t.transaction_status
  FROM transactions t
  JOIN users u ON t.user_id = u.user_id
  JOIN program p ON t.program_id = p.program_id
  WHERE t.user_id = ? AND t.program_id = ?
  LIMIT 1
`;

    const [rows] = await global.db.execute(query, [userId, programId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("❌ Error get transaction detail:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transaction detail",
    });
  }
});

module.exports = router;
