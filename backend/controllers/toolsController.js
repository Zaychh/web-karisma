// controllers/toolsController.js

// GET all tools
exports.getAllTools = async (req, res) => {
  try {
    const [tools] = await global.db.query('SELECT * FROM tools ORDER BY judul ASC');
    res.status(200).json(tools);
  } catch (error) {
    console.error("❌ ERROR GET ALL TOOLS:", error);
    res.status(500).json({ message: 'Gagal mengambil data tools', error: error.message });
  }
};

// GET single tool by ID
exports.getToolById = async (req, res) => {
  const { id } = req.params;
  try {
    const [tool] = await global.db.query('SELECT * FROM tools WHERE id = ?', [id]);
    if (tool.length === 0) return res.status(404).json({ message: 'Tool tidak ditemukan' });
    res.status(200).json(tool[0]);
  } catch (error) {
    console.error("❌ ERROR GET TOOL BY ID:", error);
    res.status(500).json({ message: 'Gagal mengambil data tool', error: error.message });
  }
};

// GET programs that use specific tool
exports.getToolPrograms = async (req, res) => {
  const { id } = req.params;
  try {
    const [programs] = await global.db.query(`
      SELECT p.program_id, p.title, p.categories, p.image_cover
      FROM program p
      JOIN program_tools pt ON p.program_id = pt.program_id
      WHERE pt.tool_id = ?
      ORDER BY p.title ASC
    `, [id]);
    
    res.status(200).json(programs);
  } catch (error) {
    console.error("❌ ERROR GET TOOL PROGRAMS:", error);
    res.status(500).json({ message: 'Gagal mengambil program yang menggunakan tool ini', error: error.message });
  }
};

// POST create tool with image
exports.createTool = async (req, res) => {
  const { judul, deskripsi } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log("🔧 Creating tool:");
  console.log("🧾 Data:", { judul, deskripsi, image });
  console.log("📁 File:", req.file);

  try {
    // Cek apakah tool dengan nama yang sama sudah ada
    const [existing] = await global.db.query(
      'SELECT id FROM tools WHERE judul = ?', 
      [judul]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        message: 'Tool dengan nama yang sama sudah ada',
        existing_id: existing[0].id 
      });
    }

    // Insert tool baru
    const [result] = await global.db.query(
      'INSERT INTO tools (judul, image, deskripsi) VALUES (?, ?, ?)',
      [judul, image, deskripsi]
    );
    
    console.log("✅ Tool created successfully, ID:", result.insertId);
    res.status(201).json({ 
      message: 'Tool berhasil ditambahkan',
      id: result.insertId,
      data: { id: result.insertId, judul, image, deskripsi }
    });
  } catch (error) {
    console.error("💥 ERROR INSERT TOOL:", error);
    res.status(500).json({ message: 'Gagal menambahkan tool', error: error.message });
  }
};

// PUT update tool with optional new image
exports.updateTool = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, oldImage } = req.body;
  const image = req.file ? req.file.filename : oldImage;

  try {
    console.log("🔧 Updating tool id:", id);
    console.log("🧾 Data:", { judul, deskripsi, image });

    // Cek apakah tool exists
    const [existingTool] = await global.db.query('SELECT * FROM tools WHERE id = ?', [id]);
    if (existingTool.length === 0) {
      return res.status(404).json({ message: 'Tool tidak ditemukan' });
    }

    // Cek apakah ada tool lain dengan nama yang sama (kecuali tool yang sedang diupdate)
    const [duplicateName] = await global.db.query(
      'SELECT id FROM tools WHERE judul = ? AND id != ?', 
      [judul, id]
    );

    if (duplicateName.length > 0) {
      return res.status(400).json({ 
        message: 'Tool dengan nama yang sama sudah ada' 
      });
    }

    // Update tool
    const [result] = await global.db.query(
      'UPDATE tools SET judul = ?, deskripsi = ?, image = ? WHERE id = ?',
      [judul, deskripsi, image, id]
    );

    console.log("✅ Tool updated successfully, affected rows:", result.affectedRows);
    res.status(200).json({ 
      message: "Tool berhasil diupdate", 
      affectedRows: result.affectedRows,
      data: { id, judul, deskripsi, image }
    });
  } catch (error) {
    console.error("❌ ERROR UPDATE TOOL:", error);
    res.status(500).json({ message: "Gagal update tool", error: error.message });
  }
};

// DELETE tool
exports.deleteTool = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("🗑️ Deleting tool id:", id);
    
    // Cek apakah tool masih digunakan oleh program
    const [usedByPrograms] = await global.db.query(
      'SELECT COUNT(*) as count FROM program_tools WHERE tool_id = ?', 
      [id]
    );

    if (usedByPrograms[0].count > 0) {
      return res.status(400).json({ 
        message: `Tool tidak dapat dihapus karena masih digunakan oleh ${usedByPrograms[0].count} program`,
        programs_count: usedByPrograms[0].count
      });
    }

    // Hapus tool jika tidak digunakan
    const [result] = await global.db.query('DELETE FROM tools WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tool tidak ditemukan' });
    }
    
    console.log("✅ Tool deleted successfully");
    res.status(200).json({ message: 'Tool berhasil dihapus', affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ ERROR DELETE TOOL:", error);
    res.status(500).json({ message: 'Gagal menghapus tool', error: error.message });
  }
};

// DELETE tool with force (hapus beserta relasinya)
exports.forceDeleteTool = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("🗑️ Force deleting tool id:", id);
    
    // Hapus semua relasi program-tools terlebih dahulu
    await global.db.query('DELETE FROM program_tools WHERE tool_id = ?', [id]);
    
    // Hapus tool
    const [result] = await global.db.query('DELETE FROM tools WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tool tidak ditemukan' });
    }
    
    console.log("✅ Tool force deleted successfully");
    res.status(200).json({ 
      message: 'Tool dan semua relasinya berhasil dihapus', 
      affectedRows: result.affectedRows 
    });
  } catch (error) {
    console.error("❌ ERROR FORCE DELETE TOOL:", error);
    res.status(500).json({ message: 'Gagal menghapus tool', error: error.message });
  }
};

// GET tools stats (berapa program yang menggunakan masing-masing tool)
exports.getToolsStats = async (req, res) => {
  try {
    const [stats] = await global.db.query(`
      SELECT 
        t.id,
        t.judul,
        t.image,
        COUNT(pt.program_id) as programs_count
      FROM tools t
      LEFT JOIN program_tools pt ON t.id = pt.tool_id
      GROUP BY t.id, t.judul, t.image
      ORDER BY programs_count DESC, t.judul ASC
    `);
    
    res.status(200).json(stats);
  } catch (error) {
    console.error("❌ ERROR GET TOOLS STATS:", error);
    res.status(500).json({ message: 'Gagal mengambil statistik tools', error: error.message });
  }
};