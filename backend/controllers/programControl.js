const { error } = require("console");
const path = require("path");

// ===== HANDLER FUNCTIONS =====
// Tambahkan ini paling atas di programControl.js
const getUploadedFile = (field, files) => {
  const found = files.find((f) => f.fieldname === field);
  return found ? found.filename : null;
};

// Handler untuk INSERT Tools
const insertTools = async (tools, programId) => {
  if (!tools || tools.length === 0) {
    console.log("⚠️ No tools to insert");
    return [];
  }

  const toolsSql = `INSERT INTO tools (judul, image, deskripsi, id_program) VALUES (?, ?, ?, ?)`;
  const insertedTools = [];

  for (const tool of tools) {
    if (tool && tool.judul) {
      // Only insert if tool has title
      try {
        const result = await global.db.query(toolsSql, [
          tool.judul,
          tool.image || null,
          tool.deskripsi || "",
          programId,
        ]);
        const toolId = result[0].insertId;
        insertedTools.push({
          id: toolId,
          judul: tool.judul,
          image: tool.image,
          deskripsi: tool.deskripsi,
          id_program: programId,
        });
        console.log(`✅ Tool inserted: ${tool.judul} (ID: ${toolId})`);
      } catch (err) {
        console.error(`❌ Error inserting tool ${tool.judul}:`, err);
        throw err;
      }
    }
  }

  return insertedTools;
};

// Handler untuk INSERT Sesi
const insertSesi = async (sesi, programId) => {
  if (!sesi || sesi.length === 0) {
    console.log("⚠️ No sesi to insert");
    return [];
  }

  const sesiSql = `INSERT INTO sesi (judul_sesi, topik, video, id_program) VALUES (?, ?, ?, ?)`;
  const insertedSesi = [];

  for (const [index, session] of sesi.entries()) {
    if (session && session.judul_sesi) {
      // Only insert if session has title
      try {
        const result = await global.db.query(sesiSql, [
          session.judul_sesi,
          session.topik || "",
          session.video || null,
          programId,
        ]);

        const sesiId = result[0].insertId;
        console.log(`✅ Sesi inserted: ${session.judul_sesi} (ID: ${sesiId})`);

        // Insert quiz and tugas for this session
        const quizData = await insertQuiz(session.quiz, sesiId);
        const tugasData = await insertTugas(session.tugas, sesiId);

        insertedSesi.push({
          id: sesiId,
          judul_sesi: session.judul_sesi,
          topik: session.topik,
          video: session.video,
          id_program: programId,
          quiz: quizData,
          tugas: tugasData,
        });
      } catch (err) {
        console.error(`❌ Error inserting sesi ${session.judul_sesi}:`, err);
        throw err;
      }
    }
  }

  return insertedSesi;
};

// Handler untuk INSERT Quiz (Soal + Jawaban)
const insertQuiz = async (quiz, sesiId) => {
  if (!quiz || !quiz.soal) return null;

  try {
    // Insert soal
    const soalSql = `INSERT INTO soal (soal, id_sesi) VALUES (?, ?)`;
    const soalResult = await global.db.query(soalSql, [quiz.soal, sesiId]);
    const soalId = soalResult[0].insertId;

    console.log(
      `✅ Soal inserted: ${quiz.soal.substring(0, 30)}... (ID: ${soalId})`
    );

    // Insert jawaban
    const jawabanData = await insertJawaban(quiz.jawaban, quiz.benar, soalId);

    return {
      id: soalId,
      soal: quiz.soal,
      id_sesi: sesiId,
      jawaban: jawabanData,
    };
  } catch (err) {
    console.error(`❌ Error inserting quiz for sesi ${sesiId}:`, err);
    throw err;
  }
};

// Handler untuk INSERT Jawaban
const insertJawaban = async (jawaban, benar, soalId) => {
  if (!jawaban || jawaban.length === 0) return [];

  const jawabanSql = `INSERT INTO jawaban (jawaban, benar, id_soal) VALUES (?, ?, ?)`;
  const insertedJawaban = [];

  for (const [jawabanIndex, jawabanText] of jawaban.entries()) {
    if (jawabanText && jawabanText.trim()) {
      // Only insert non-empty answers
      try {
        const isCorrect = jawabanIndex === parseInt(benar || 0) ? 1 : 0;
        const result = await global.db.query(jawabanSql, [
          jawabanText,
          isCorrect,
          soalId,
        ]);

        insertedJawaban.push({
          id: result[0].insertId,
          jawaban: jawabanText,
          benar: isCorrect,
          id_soal: soalId,
        });

        console.log(
          `✅ Jawaban inserted: ${jawabanText} (${
            isCorrect ? "BENAR" : "SALAH"
          })`
        );
      } catch (err) {
        console.error(`❌ Error inserting jawaban ${jawabanText}:`, err);
        throw err;
      }
    }
  }

  return insertedJawaban;
};

// Handler untuk INSERT Tugas
const insertTugas = async (tugas, sesiId) => {
  if (!tugas || !tugas.soal_tugas) return null;

  try {
    const tugasSql = `INSERT INTO tugas (soal_tugas, id_sesi) VALUES (?, ?)`;
    const result = await global.db.query(tugasSql, [tugas.soal_tugas, sesiId]);

    console.log(
      `✅ Tugas inserted: ${tugas.soal_tugas.substring(0, 30)}... (ID: ${
        result[0].insertId
      })`
    );

    return {
      id: result[0].insertId,
      soal_tugas: tugas.soal_tugas,
      id_sesi: sesiId,
    };
  } catch (err) {
    console.error(`❌ Error inserting tugas for sesi ${sesiId}:`, err);
    throw err;
  }
};

// ===== MAIN CONTROLLER FUNCTIONS =====

exports.getAllPrograms = async (req, res) => {
  try {
    const [rows] = await global.db.query(
      "SELECT * FROM program ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ getAllPrograms error:", err);
    res.status(500).json({ error: "Gagal mengambil data program" });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const [rows] = await global.db.query(
      "SELECT * FROM program WHERE program_id = ?",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Program tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ getProgramById error:", err);
    res.status(500).json({ error: "Gagal mengambil data program" });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const {
      title,
      deskripsi,
      harga,
      categories,
      instructor_id,
    } = req.body;

    const files = req.files;
    const image_cover = files?.image_cover?.[0]?.filename || null;

    console.log("=== CREATE PROGRAM DEBUG ===");
    console.log("Basic data:", { title, deskripsi, harga, categories, instructor_id, image_cover });

    // Step 1: Simpan data utama program
    const [programResult] = await global.db.query(
      `INSERT INTO program (title, deskripsi, harga, categories, image_cover, instructor_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, deskripsi, harga, categories, image_cover, instructor_id]
    );
    const programId = programResult.insertId;
    console.log(`✅ Program inserted: ${title} (ID: ${programId})`);

    // Step 2: Parse & Insert TOOLS
    let toolIndex = 0;
    while (req.body[`tools[${toolIndex}][judul]`] !== undefined) {
      const judul = req.body[`tools[${toolIndex}][judul]`];
      const deskripsi = req.body[`tools[${toolIndex}][deskripsi]`];
      const image = files?.[`tools[${toolIndex}][image]`]?.[0]?.filename || null;

      await global.db.query(
        `INSERT INTO tools (id_kelas, judul, deskripsi, image)
         VALUES (?, ?, ?, ?)`,
        [programId, judul, deskripsi, image]
      );
      console.log(`✅ Tool inserted: ${judul}`);
      toolIndex++;
    }

    // Step 3: Parse & Insert SESI + QUIZ + TUGAS
    let sesiIndex = 0;
    while (req.body[`sesi[${sesiIndex}][judul_sesi]`] !== undefined) {
      const judul_sesi = req.body[`sesi[${sesiIndex}][judul_sesi]`];
      const topik = req.body[`sesi[${sesiIndex}][topik]`] || '';
      const video = files?.[`sesi[${sesiIndex}][video]`]?.[0]?.filename || null;

      // Insert sesi
      const [sesiResult] = await global.db.query(
        `INSERT INTO sesi (id_kelas, judul_sesi, topik, video)
         VALUES (?, ?, ?, ?)`,
        [programId, judul_sesi, topik, video]
      );
      const sesiId = sesiResult.insertId;
      console.log(`✅ Sesi inserted: ${judul_sesi} (ID: ${sesiId})`);

      // Insert quiz
      const soalQuiz = req.body[`sesi[${sesiIndex}][quiz][soal]`];
      const [quizResult] = await global.db.query(
        `INSERT INTO quiz (id_sesi, soal) VALUES (?, ?)`,
        [sesiId, soalQuiz]
      );
      const quizId = quizResult.insertId;

      // Insert jawaban
      for (let j = 0; j < 4; j++) {
        const jawaban = req.body[`sesi[${sesiIndex}][quiz][jawaban][${j}]`];
        if (!jawaban) continue;
        const benar = parseInt(req.body[`sesi[${sesiIndex}][quiz][benar]`]) === j ? 1 : 0;
        await global.db.query(
          `INSERT INTO soal (id_quiz, jawaban, benar)
           VALUES (?, ?, ?)`,
          [quizId, jawaban, benar]
        );
      }

      // Insert tugas
      const soalTugas = req.body[`sesi[${sesiIndex}][tugas][soal_tugas]`];
      await global.db.query(
        `INSERT INTO tugas (id_sesi, soal_tugas) VALUES (?, ?)`,
        [sesiId, soalTugas]
      );

      sesiIndex++;
    }

    console.log("✅ All data inserted successfully!");
    res.status(201).json({ message: "Program berhasil dibuat!" });
  } catch (err) {
    console.error("❌ Gagal create program:", err);
    res.status(500).json({ error: "Gagal create program", details: err.message });
  }
};


exports.updateProgram = async (req, res) => {
  const { title, deskripsi, harga, categories } = req.body;
  const program_id = req.params.id;
  const image_cover = req.file ? req.file.filename : null;

  try {
    let sql = `
      UPDATE program 
      SET title = ?, deskripsi = ?, harga = ?, categories = ?
    `;
    const params = [title, deskripsi, harga, categories];

    if (image_cover) {
      sql += `, image_cover = ?`;
      params.push(image_cover);
    }

    sql += ` WHERE program_id = ?`;
    params.push(program_id);

    await global.db.query(sql, params);
    res.json({ message: "Program berhasil diperbarui" });
  } catch (err) {
    console.error("❌ updateProgram error:", err);
    res.status(500).json({ error: "Gagal memperbarui program" });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    await global.db.query("DELETE FROM program WHERE program_id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Program berhasil dihapus" });
  } catch (err) {
    console.error("❌ deleteProgram error:", err);
    res.status(500).json({ error: "Gagal menghapus program" });
  }
};

// Njukuk Kategori Program (dari ENUM)
exports.getProgramCategories = async (req, res) => {
  try {
    console.log("[DEBUG] Fetching enum values from categories");

    const [rows] = await global.db.query(`
      SHOW COLUMNS FROM program LIKE 'categories'
    `);

    console.log("[DEBUG] Result:", rows);

    if (!rows || rows.length === 0) {
      return res.status(500).json({ error: "Field categories not found" });
    }

    const enumStr = rows[0].Type; // contoh: "enum('Bootcamp','Free Class')"
    const values = enumStr
      .match(/'([^']+)'/g)
      .map((val) => val.replace(/'/g, ""));

    res.status(200).json(values);
  } catch (err) {
    console.error("[ERROR getProgramCategories]", err);
    res.status(500).json({ error: "Gagal mengambil data kategori program" });
  }
};

// ===== INDIVIDUAL HANDLER EXPORTS (untuk keperluan testing atau penggunaan terpisah) =====
exports.insertTools = insertTools;
exports.insertSesi = insertSesi;
exports.insertQuiz = insertQuiz;
exports.insertJawaban = insertJawaban;
exports.insertTugas = insertTugas;
