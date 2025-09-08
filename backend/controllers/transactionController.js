exports.getAllTransactions = async (req, res) => {
  try {
    const [rows] = await global.db.query(`
      SELECT 
        t.id,
        t.full_name,
        p.title AS program_name,  
        t.gross_amount,
        t.transaction_status,
        t.created_at
      FROM transactions t
      LEFT JOIN program p ON t.program_id = p.program_id
      ORDER BY t.created_at DESC
    `);

    const mapped = rows.map(row => ({
      ...row,
      status:
        row.transaction_status === "success"
          ? "Success"
          : row.transaction_status === "pending"
          ? "Pending"
          : "Failed"
    }));

    res.json({ success: true, data: mapped });
  } catch (err) {
    console.error("[ERROR] getAllTransactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

exports.getTransactionDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await global.db.query(`
      SELECT 
        t.id,
        t.order_id,
        t.full_name,
        p.title AS program_name,
        p.categories,
        t.transaction_time,
        t.payment_type AS payment_method,
        t.gross_amount,
        t.transaction_status
      FROM transactions t
      LEFT JOIN program p ON t.program_id = p.program_id
      WHERE t.id = ?
      LIMIT 1
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("[ERROR] getTransactionDetail:", err);
    res.status(500).json({ error: "Failed to fetch transaction detail" });
  }
};

//Get user transactions (User My Profile)
exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const [rows] = await global.db.query(
      `SELECT 
        t.id AS transaction_id,
        t.transaction_time,
        p.title AS program_name,
        t.transaction_status
      FROM transactions t
      LEFT JOIN program p ON t.program_id = p.program_id
      WHERE t.user_id = ? AND (t.is_read IS NULL OR t.is_read = 0)
      ORDER BY t.transaction_time DESC`,
      [userId]
    );

    res.json({
      success: true,
      data: rows.map(row => ({
        ...row,
        status:
          row.transaction_status === "success"
            ? "Success"
            : row.transaction_status === "pending"
            ? "Pending"
            : "Failed"
      })),
    });
  } catch (err) {
    console.error("[ERROR] getUserTransactions:", err);
    res.status(500).json({ error: "Failed to fetch user transactions" });
  }
};

//Buat mark notifikasi yang dihapus biar tidak muncul lagi pas refresh web (User My Profile)
exports.markTransactionAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;

    await global.db.query(
      `UPDATE transactions SET is_read = 1 WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    res.json({ success: true, message: "Transaction marked as read" });
  } catch (err) {
    console.error("[ERROR] markTransactionAsRead:", err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};
