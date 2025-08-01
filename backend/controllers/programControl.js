const { error } = require("console");
const path = require("path");

// === POST /api/program – Tambah Program
exports.createProgram = async (req, res) => {
  try {
    console.log("=== DEBUG CREATE ===");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { title, deskripsi, harga, categories } = req.body;
    const image_cover = req.file ? req.file.filename : null;
    console.log("Image Cover:", image_cover);

    const [result] = await global.db.query(
      `INSERT INTO program (title, deskripsi, harga, categories, image_cover)
       VALUES (?, ?, ?, ?, ?)`,
      [title, deskripsi, harga, categories, image_cover]
    );

    res.status(201).json({
      message: "Program berhasil dibuat",
      program_id: result.insertId,
    });
  } catch (err) {
    console.error("❌ Gagal create program:", err);
    res.status(500).json({ error: "Gagal create program", detail: err.message });
    return res.status(500).json({
      error: "Gagal Create Program",
      detail: err.message,
      stack: err.stack,
    });
  }
};

// === GET /api/program – Ambil Semua Program
exports.getAllPrograms = async (req, res) => {
  try {
    const [rows] = await global.db.query(
      `SELECT * FROM program ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ getAllPrograms error:", err);
    res.status(500).json({ error: "Gagal mengambil data program" });
  }
};

// === GET /api/program/:id – Ambil Program by ID
// === GET /api/program/:id – Ambil Detail Lengkap Program
exports.getProgramById = async (req, res) => {
  try {
    const [programRows] = await global.db.query(
      `SELECT * FROM program WHERE program_id = ?`,
      [req.params.id]
    );

    if (!programRows.length) {
      return res.status(404).json({ error: "Program tidak ditemukan" });
    }

    const program = programRows[0];

    // Ambil tools
    const [tools] = await global.db.query(
      `SELECT image FROM tools WHERE id_program = ?`,
      [program.program_id]
    );

    // Ambil instructor
    const [instructorRows] = await global.db.query(
      `SELECT name, image, mastery FROM instructor WHERE instructor_id = ?`,
      [program.instructor_id]
    );

    const instructor = instructorRows[0] || {
      name: "Tidak diketahui",
      image: "",
      mastery: "",
    };

    res.json({
      ...program,
      tools,
      instructor,
    });
  } catch (err) {
    console.error("❌ getProgramById error:", err);
    res.status(500).json({ error: "Gagal mengambil program" });
  }
};



// === PUT /api/program/:id – Update Program
exports.updateProgram = async (req, res) => {
  try {
    const { title, deskripsi, harga, categories } = req.body;
    const programId = req.params.id;
    const image_cover = req.file?.filename || null;

    let sql = `UPDATE program SET title = ?, deskripsi = ?, harga = ?, categories = ?`;
    const params = [title, deskripsi, harga, categories];

    if (image_cover) {
      sql += `, image_cover = ?`;
      params.push(image_cover);
    }

    sql += ` WHERE program_id = ?`;
    params.push(programId);

    await global.db.query(sql, params);
    res.json({ message: "Program berhasil diperbarui" });
  } catch (err) {
    console.error("❌ updateProgram error:", err);
    res.status(500).json({ error: "Gagal memperbarui program" });
  }
};

// === DELETE /api/program/:id – Hapus Program
exports.deleteProgram = async (req, res) => {
  try {
    await global.db.query(
      `DELETE FROM program WHERE program_id = ?`,
      [req.params.id]
    );
    res.json({ message: "Program berhasil dihapus" });
  } catch (err) {
    console.error("❌ deleteProgram error:", err);
    res.status(500).json({ error: "Gagal menghapus program" });
    console.log("❌ DELETE ID:", req.params.id);
  }
};

// === GET /api/program/categories – Ambil Enum Kategori Program
exports.getProgramCategories = async (req, res) => {
  try {
    const [rows] = await global.db.query(
      `SHOW COLUMNS FROM program LIKE 'categories'`
    );
    if (!rows.length) {
      return res.status(500).json({ error: "Field categories tidak ditemukan" });
    }

    const enumStr = rows[0].Type; // contoh: enum('Bootcamp','Free Class')
    const values = enumStr.match(/'([^']+)'/g).map(val => val.replace(/'/g, ""));
    res.json(values);
  } catch (err) {
    console.error("[getProgramCategories] error:", err);
    res.status(500).json({ error: "Gagal mengambil kategori program" });
  }
};
