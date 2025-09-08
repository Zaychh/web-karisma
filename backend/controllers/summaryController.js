exports.getSummary = async (req, res) => {
  try {
    // Total Peserta (role = user)
    const [userRows] = await global.db.execute(
      "SELECT COUNT(*) AS total FROM users WHERE role = 'user'"
    );

    // Total Instructors
    const [instructorRows] = await global.db.execute(
      "SELECT COUNT(*) AS total FROM instructor"
    );

    // Monthly Income (hanya transaction_status = success & bulan sekarang)
    const [incomeRows] = await global.db.execute(
      `SELECT COALESCE(SUM(gross_amount), 0) AS total
       FROM transactions
       WHERE transaction_status = 'success'
       AND MONTH(transaction_time) = MONTH(CURRENT_DATE())
       AND YEAR(transaction_time) = YEAR(CURRENT_DATE())`
    );

    res.json({
      success: true,
      data: {
        totalUsers: userRows[0].total,
        totalInstructors: instructorRows[0].total,
        monthlyIncome: incomeRows[0].total,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching summary:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
