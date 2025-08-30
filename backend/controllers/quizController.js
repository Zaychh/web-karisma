// controllers/quizController.js - FIXED VERSION (Error Fix)

const quizController = {
  // Create new quiz with soal and jawaban - FIXED
  createQuiz: async (req, res) => {
    try {
      console.log("📥 Received quiz data:", req.body);

      const {
        id_sesi,
        pertanyaan,
        jawaban_1,
        jawaban_2,
        jawaban_3,
        jawaban_4,
        jawaban_benar,
      } = req.body;

      // Enhanced validation
      if (
        !id_sesi ||
        !pertanyaan ||
        !jawaban_1 ||
        !jawaban_2 ||
        !jawaban_3 ||
        !jawaban_4 ||
        !jawaban_benar
      ) {
        console.log("❌ Validation failed - missing fields");
        return res.status(400).json({
          success: false,
          message: "All fields are required",
          received: {
            id_sesi: !!id_sesi,
            pertanyaan: !!pertanyaan,
            jawaban_1: !!jawaban_1,
            jawaban_2: !!jawaban_2,
            jawaban_3: !!jawaban_3,
            jawaban_4: !!jawaban_4,
            jawaban_benar: !!jawaban_benar,
          },
        });
      }

      const jawabanBenarInt = parseInt(jawaban_benar);
      if (![1, 2, 3, 4].includes(jawabanBenarInt)) {
        console.log("❌ Invalid jawaban_benar:", jawaban_benar);
        return res.status(400).json({
          success: false,
          message: "jawaban_benar must be between 1-4",
        });
      }

      // Check if database connection exists
      if (!global.db) {
        console.log("❌ Database connection not found");
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      // Check if sesi exists first
      console.log("🔍 Checking if sesi exists:", id_sesi);
      const [sesiCheck] = await global.db.execute(
        "SELECT id FROM sesi WHERE id = ?",
        [id_sesi]
      );
      if (!sesiCheck || sesiCheck.length === 0) {
        console.log("❌ Sesi not found:", id_sesi);
        return res.status(404).json({
          success: false,
          message: "Sesi tidak ditemukan",
        });
      }

      // Check if sesi already has quiz (1 sesi = 1 quiz)
      console.log("🔍 Checking existing quiz for sesi:", id_sesi);
      const [existingQuiz] = await global.db.execute(
        "SELECT id FROM quiz WHERE id_sesi = ?",
        [id_sesi]
      );
      if (existingQuiz && existingQuiz.length > 0) {
        console.log("❌ Sesi already has quiz:", id_sesi);
        return res.status(400).json({
          success: false,
          message: "Sesi ini sudah memiliki quiz",
        });
      }

      // Start transaction - FIXED: Use query() instead of execute() for transaction commands
      console.log("🔄 Starting transaction...");
      await global.db.query("START TRANSACTION");

      try {
        // 1. Insert soal first
        console.log("📝 Inserting soal...");
        const [soalResult] = await global.db.execute(
          "INSERT INTO soal (soal) VALUES (?)",
          [pertanyaan]
        );
        const soalId = soalResult.insertId;
        console.log("✅ Soal inserted with ID:", soalId);

        // 2. Insert quiz
        console.log("📝 Inserting quiz...");
        const [quizResult] = await global.db.execute(
          "INSERT INTO quiz (id_sesi, id_soal) VALUES (?, ?)",
          [id_sesi, soalId]
        );
        const quizId = quizResult.insertId;
        console.log("✅ Quiz inserted with ID:", quizId);

        // 3. Insert 4 jawaban
        console.log("📝 Inserting jawaban...");
        const jawaban = [jawaban_1, jawaban_2, jawaban_3, jawaban_4];

        for (let i = 0; i < jawaban.length; i++) {
          const isBenar = i + 1 === jawabanBenarInt;
          await global.db.execute(
            "INSERT INTO jawaban (jawaban, benar, id_soal) VALUES (?, ?, ?)",
            [jawaban[i], isBenar ? 1 : 0, soalId]
          );
          console.log(
            `✅ Jawaban ${i + 1} inserted:`,
            jawaban[i],
            isBenar ? "(BENAR)" : ""
          );
        }

        // Commit transaction - FIXED: Use query() instead of execute()
        await global.db.query("COMMIT");
        console.log("✅ Transaction committed successfully");

        res.status(201).json({
          success: true,
          message: "Quiz created successfully",
          data: {
            quiz_id: quizId,
            soal_id: soalId,
          },
        });
      } catch (transactionError) {
        // Rollback transaction - FIXED: Use query() instead of execute()
        await global.db.query("ROLLBACK");
        console.error("❌ Transaction error, rolled back:", transactionError);
        throw transactionError;
      }
    } catch (error) {
      console.error("❌ Error creating quiz:", error);
      res.status(500).json({
        success: false,
        message: "Error creating quiz: " + error.message,
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  },

  // Get all quizzes
  getAllQuizzes: async (req, res) => {
    try {
      const [quizzes] = await global.db.execute(`
                SELECT q.*, s.judul_sesi 
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                ORDER BY q.id DESC
            `);

      res.status(200).json({
        success: true,
        data: quizzes,
      });
    } catch (error) {
      console.error("Error getting quizzes:", error);
      res.status(500).json({
        success: false,
        message: "Error getting quizzes",
      });
    }
  },

  getQuizForSiswaBySesi: async (req, res) => {
    try {
      const { sesi_id } = req.params;

      // Ambil quiz + soal + semua jawaban (4 opsi)
      const [rows] = await global.db.execute(
        `SELECT 
         q.id           AS quiz_id,
         so.id          AS soal_id,
         so.soal        AS pertanyaan,
         j.id           AS jawaban_id,
         j.jawaban      AS opsi_text
       FROM quiz q
       JOIN soal so   ON so.id = q.id_soal
       JOIN jawaban j ON j.id_soal = so.id
       WHERE q.id_sesi = ?
       ORDER BY q.id ASC, j.id ASC`,
        [sesi_id]
      );

      // Grouping per quiz_id menjadi 4 opsi (A-D)
      const byQuiz = new Map();
      for (const r of rows) {
        if (!byQuiz.has(r.quiz_id)) {
          byQuiz.set(r.quiz_id, {
            id: r.quiz_id,
            pertanyaan: r.pertanyaan,
            opsi_a: null,
            opsi_a_id: null,
            opsi_b: null,
            opsi_b_id: null,
            opsi_c: null,
            opsi_c_id: null,
            opsi_d: null,
            opsi_d_id: null,
          });
        }
        const item = byQuiz.get(r.quiz_id);
        const count = [
          item.opsi_a_id,
          item.opsi_b_id,
          item.opsi_c_id,
          item.opsi_d_id,
        ].filter(Boolean).length;

        // Map berurutan: A, B, C, D
        if (count === 0) {
          item.opsi_a = r.opsi_text;
          item.opsi_a_id = r.jawaban_id;
        } else if (count === 1) {
          item.opsi_b = r.opsi_text;
          item.opsi_b_id = r.jawaban_id;
        } else if (count === 2) {
          item.opsi_c = r.opsi_text;
          item.opsi_c_id = r.jawaban_id;
        } else if (count === 3) {
          item.opsi_d = r.opsi_text;
          item.opsi_d_id = r.jawaban_id;
        }
      }

      res.json({ success: true, data: Array.from(byQuiz.values()) });
    } catch (err) {
      console.error("❌ Error getQuizForSiswaBySesi:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // Get quiz by ID with soal and jawaban
  getQuizById: async (req, res) => {
    try {
      const { id } = req.params;

      // Get quiz info
      const [quiz] = await global.db.execute(
        `
                SELECT q.*, s.judul_sesi 
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                WHERE q.id = ?
            `,
        [id]
      );

      if (!quiz.length) {
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }

      // Get soal for this quiz
      const [soal] = await global.db.execute(
        `SELECT * FROM soal WHERE id = ?`,
        [quiz[0].id_soal]
      );

      // Get jawaban for this soal
      const [jawaban] = await global.db.execute(
        `SELECT * FROM jawaban WHERE id_soal = ? ORDER BY id`,
        [soal[0]?.id]
      );

      res.status(200).json({
        success: true,
        data: {
          quiz: quiz[0],
          soal: soal[0],
          jawaban: jawaban,
        },
      });
    } catch (error) {
      console.error("Error getting quiz by ID:", error);
      res.status(500).json({
        success: false,
        message: "Error getting quiz",
      });
    }
  },

  // Update quiz - FIXED TRANSACTION
  updateQuiz: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        pertanyaan,
        jawaban_1,
        jawaban_2,
        jawaban_3,
        jawaban_4,
        jawaban_benar,
      } = req.body;

      // Get current quiz
      const [currentQuiz] = await global.db.execute(
        "SELECT * FROM quiz WHERE id = ?",
        [id]
      );
      if (!currentQuiz.length) {
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }

      const soalId = currentQuiz[0].id_soal;

      // Start transaction - FIXED
      await global.db.query("START TRANSACTION");

      try {
        // 1. Update soal
        if (pertanyaan) {
          await global.db.execute("UPDATE soal SET soal = ? WHERE id = ?", [
            pertanyaan,
            soalId,
          ]);
        }

        // 2. Update jawaban
        if (jawaban_1 || jawaban_2 || jawaban_3 || jawaban_4 || jawaban_benar) {
          const [currentJawaban] = await global.db.execute(
            "SELECT * FROM jawaban WHERE id_soal = ? ORDER BY id",
            [soalId]
          );

          const jawaban = [jawaban_1, jawaban_2, jawaban_3, jawaban_4];

          for (
            let i = 0;
            i < currentJawaban.length && i < jawaban.length;
            i++
          ) {
            if (jawaban[i]) {
              const isBenar = jawaban_benar
                ? i + 1 === parseInt(jawaban_benar)
                : currentJawaban[i].benar;
              await global.db.execute(
                "UPDATE jawaban SET jawaban = ?, benar = ? WHERE id = ?",
                [jawaban[i], isBenar ? 1 : 0, currentJawaban[i].id]
              );
            }
          }
        }

        // Commit transaction - FIXED
        await global.db.query("COMMIT");

        res.status(200).json({
          success: true,
          message: "Quiz updated successfully",
        });
      } catch (transactionError) {
        // Rollback transaction - FIXED
        await global.db.query("ROLLBACK");
        throw transactionError;
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({
        success: false,
        message: "Error updating quiz",
      });
    }
  },

  // Delete quiz - FIXED TRANSACTION
  deleteQuiz: async (req, res) => {
    try {
      const { id } = req.params;

      // Get quiz to get soal_id
      const [quiz] = await global.db.execute(
        "SELECT * FROM quiz WHERE id = ?",
        [id]
      );
      if (!quiz.length) {
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }

      const soalId = quiz[0].id_soal;

      // Start transaction - FIXED
      await global.db.query("START TRANSACTION");

      try {
        // Delete in order: jawaban -> quiz -> soal
        await global.db.execute("DELETE FROM jawaban WHERE id_soal = ?", [
          soalId,
        ]);
        await global.db.execute("DELETE FROM quiz WHERE id = ?", [id]);
        await global.db.execute("DELETE FROM soal WHERE id = ?", [soalId]);

        // Commit transaction - FIXED
        await global.db.query("COMMIT");

        res.status(200).json({
          success: true,
          message: "Quiz deleted successfully",
        });
      } catch (transactionError) {
        // Rollback transaction - FIXED
        await global.db.query("ROLLBACK");
        throw transactionError;
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting quiz",
      });
    }
  },

  // Get quiz for student (without showing correct answer)
  getQuizForStudent: async (req, res) => {
    try {
      const { id } = req.params;

      const [quiz] = await global.db.execute(
        `
                SELECT q.*, s.judul_sesi, so.soal
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                JOIN soal so ON q.id_soal = so.id
                WHERE q.id = ?
            `,
        [id]
      );

      if (!quiz.length) {
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }

      // Get jawaban without showing which one is correct
      const [jawaban] = await global.db.execute(
        `SELECT id, jawaban FROM jawaban WHERE id_soal = ? ORDER BY id`,
        [quiz[0].id_soal]
      );

      res.status(200).json({
        success: true,
        data: {
          quiz: quiz[0],
          jawaban: jawaban,
        },
      });
    } catch (error) {
      console.error("Error getting quiz for student:", error);
      res.status(500).json({
        success: false,
        message: "Error getting quiz",
      });
    }
  },

  // Submit quiz answer
  submitQuizAnswer: async (req, res) => {
    try {
      const { quiz_id, jawaban_id } = req.body;

      if (!quiz_id || !jawaban_id) {
        return res.status(400).json({
          success: false,
          message: "quiz_id and jawaban_id are required",
        });
      }

      // Check if answer is correct
      const [result] = await global.db.execute(
        `
                SELECT j.benar, j.jawaban, so.soal
                FROM jawaban j
                JOIN soal so ON j.id_soal = so.id
                JOIN quiz q ON q.id_soal = so.id
                WHERE j.id = ? AND q.id = ?
            `,
        [jawaban_id, quiz_id]
      );

      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: "Invalid quiz or answer",
        });
      }

      const isCorrect = result[0].benar === 1;

      res.status(200).json({
        success: true,
        data: {
          is_correct: isCorrect,
          selected_answer: result[0].jawaban,
          question: result[0].soal,
        },
      });
    } catch (error) {
      console.error("Error submitting quiz answer:", error);
      res.status(500).json({
        success: false,
        message: "Error submitting answer",
      });
    }
  },

  submitQuizBySesi: async (req, res) => {
    try {
      const { sesi_id, answers } = req.body;
      const userId = req.user?.user_id || req.body.user_id;

      // Hitung total quiz di sesi
      const [totalRow] = await global.db.execute(
        "SELECT COUNT(*) AS total FROM quiz WHERE id_sesi = ?",
        [sesi_id]
      );
      const total = totalRow[0]?.total || 0;

      let correctCount = 0;

      for (const ans of answers || []) {
        if (!ans.jawaban_id) continue;

        const [rows] = await global.db.execute(
          `SELECT j.benar 
           FROM jawaban j
           JOIN soal so ON so.id = j.id_soal
           JOIN quiz q  ON q.id_soal = so.id
           WHERE q.id = ? AND j.id = ?`,
          [ans.id_quiz, ans.jawaban_id]
        );

        if (rows.length && rows[0].benar === 1) {
          correctCount++;

          // 🔥 Simpan jawaban ke user_quiz
          await global.db.execute(
            `INSERT INTO user_quiz (user_id, sesi_id, quiz_id, jawaban_id, is_correct)
             VALUES (?, ?, ?, ?, 1)
             ON DUPLICATE KEY UPDATE jawaban_id = VALUES(jawaban_id), is_correct = 1`,
            [userId, sesi_id, ans.id_quiz, ans.jawaban_id]
          );
        } else {
          // kalau salah, tetap simpan supaya nanti tau user pernah jawab
          await global.db.execute(
            `INSERT INTO user_quiz (user_id, sesi_id, quiz_id, jawaban_id, is_correct)
             VALUES (?, ?, ?, ?, 0)
             ON DUPLICATE KEY UPDATE jawaban_id = VALUES(jawaban_id), is_correct = 0`,
            [userId, sesi_id, ans.id_quiz, ans.jawaban_id]
          );
        }
      }

      const allCorrect = total > 0 && correctCount === total;

      // ✅ Update progress kalau semua benar
      if (allCorrect && userId) {
        const [[sesiInfo]] = await global.db.execute(
          "SELECT id_program FROM sesi WHERE id = ?",
          [sesi_id]
        );
        if (sesiInfo?.id_program) {
          const programId = sesiInfo.id_program;
          const [[{ total: totalSesi }]] = await global.db.execute(
            "SELECT COUNT(*) AS total FROM sesi WHERE id_program = ?",
            [programId]
          );

          const increment = totalSesi > 0 ? 100 / totalSesi : 0;

          const [exist] = await global.db.execute(
            "SELECT progress_id, percentage FROM user_progress WHERE user_id = ? AND bootcamp_id = ?",
            [userId, programId]
          );

          if (exist.length > 0) {
            const newPercentage = Math.min(
              100,
              exist[0].percentage + increment
            );
            await global.db.execute(
              "UPDATE user_progress SET percentage = ? WHERE progress_id = ?",
              [newPercentage, exist[0].progress_id]
            );
          } else {
            await global.db.execute(
              "INSERT INTO user_progress (user_id, bootcamp_id, percentage) VALUES (?, ?, ?)",
              [userId, programId, increment]
            );
          }
        }
      }

      res.json({
        success: true,
        correct: allCorrect,
        correctCount,
        total,
      });
    } catch (err) {
      console.error("❌ Error submitQuizBySesi:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  //Endpoint untuk cek apakah user sudah pernah jawab quiz
  checkSesiQuiz: async (req, res) => {
    try {
      const sesi_id = req.params.sesi_id;
      const userId = req.user?.user_id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const [rows] = await global.db.execute(
        `SELECT q.id AS quiz_id, uq.jawaban_id, uq.is_correct, uq.created_at
   FROM quiz q
   LEFT JOIN user_quiz uq 
     ON uq.quiz_id = q.id AND uq.user_id = ?
   WHERE q.id_sesi = ?`,
        [userId, sesi_id]
      );

      res.json({ success: true, data: rows });
    } catch (err) {
      console.error("❌ Error checkSesiQuiz:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // Get quizzes by program ID
  getQuizzesByProgram: async (req, res) => {
    try {
      const { program_id } = req.params;

      const [quizzes] = await global.db.execute(
        `
                SELECT q.*, s.judul_sesi, s.topik, so.soal
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                JOIN soal so ON q.id_soal = so.id
                WHERE s.id_program = ?
                ORDER BY s.id, q.id
            `,
        [program_id]
      );

      res.status(200).json({
        success: true,
        data: quizzes,
      });
    } catch (error) {
      console.error("Error getting quizzes by program:", error);
      res.status(500).json({
        success: false,
        message: "Error getting quizzes",
      });
    }
  },

  // Get quizzes by sesi ID
  getQuizzesBySesi: async (req, res) => {
    try {
      const { sesi_id } = req.params;

      const [quizzes] = await global.db.execute(
        `
                SELECT q.*, s.judul_sesi, s.topik, so.soal
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                JOIN soal so ON q.id_soal = so.id
                WHERE q.id_sesi = ?
                ORDER BY q.id
            `,
        [sesi_id]
      );

      res.status(200).json({
        success: true,
        data: quizzes,
      });
    } catch (error) {
      console.error("Error getting quizzes by sesi:", error);
      res.status(500).json({
        success: false,
        message: "Error getting quizzes",
      });
    }
  },
};

module.exports = quizController;
