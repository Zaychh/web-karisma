const { db } = require('../database');

const getAllPrograms = (req, res) => {
    const sql = "SELECT * FROM program ORDER BY created_at DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

const getProgramById = (req, res) => {
    const sql = "SELECT * FROM program WHERE program_id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

const createProgram = (req, res) => {
    const { title, description, price, category, image } = req.body;
    const sql = "INSERT INTO program (title, description, price, category, image) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, description, price, category, image], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Program Sukses Ditambahno Kang"});
    });
};

const updateProgram = (req, res) => {
    const { title, description, price, category, image } = req.body;
    const sql = "UPDATE program SET title=?, description=?, price=?, category=?, image=? WHERE program_id=?";
    db.query(sql, [title, description, price, category, image, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Program Sukses Diupdate Kang"});
    });
};

const deleteProgram = (req, res) => {
    const sql = "DELETE FROM program WHERE program_id=?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Program Sukses Dihapus Kang" });
    });
};

// Njukuk Kategori Program (dari ENUM)
const getProgramCategories = (req, res) => {
  const sql = "SHOW COLUMNS FROM program LIKE 'category'";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).json({ error: 'Query error', detail: err });
    }

    console.log("✅ Result:", result);

    if (!result.length || !result[0].Type) {
      console.error("❌ Kolom category tidak ditemukan");
      return res.status(500).json({ error: 'Kolom category tidak ditemukan' });
    }

    const enumStr = result[0].Type;
    console.log("📦 enumStr =", enumStr);

    const match = enumStr.match(/^enum\((.*)\)$/);
    if (!match) {
      console.error("❌ Gagal regex enum");
      return res.status(500).json({ error: 'Gagal parsing enum kategori' });
    }

    const categories = match[1]
      .split(/,\s*/)
      .map((val) => val.replace(/'/g, '').trim());

    console.log("✅ Parsed categories:", categories);
    res.json(categories);
  });
};


module.exports = {
    getAllPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
    getProgramCategories
};