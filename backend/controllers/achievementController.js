const path = require("path");
const fs = require("fs");

// GET all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const [achievements] = await global.db.query('SELECT * FROM achievements ORDER BY name ASC');
    res.status(200).json(achievements);
  } catch (error) {
    console.error("❌ ERROR GET ALL ACHIEVEMENTS:", error);
    res.status(500).json({ message: 'Gagal mengambil data achievements', error: error.message });
  }
};

// GET single achievement by ID
exports.getAchievementById = async (req, res) => {
  const { id } = req.params;
  try {
    const [achievement] = await global.db.query('SELECT * FROM achievements WHERE achievement_id = ?', [id]);
    if (achievement.length === 0) return res.status(404).json({ message: 'Achievement tidak ditemukan' });
    res.status(200).json(achievement[0]);
  } catch (error) {
    console.error("❌ ERROR GET ACHIEVEMENT BY ID:", error);
    res.status(500).json({ message: 'Gagal mengambil data achievement', error: error.message });
  }
};

// GET programs that use specific achievement
exports.getAchievementPrograms = async (req, res) => {
  const { id } = req.params;
  try {
    const [programs] = await global.db.query(`
      SELECT p.program_id, p.title, p.categories, p.image_cover
      FROM program p
      JOIN program_achievements pa ON p.program_id = pa.program_id
      WHERE pa.achievement_id = ?
      ORDER BY p.title ASC
    `, [id]);
    
    res.status(200).json(programs);
  } catch (error) {
    console.error("❌ ERROR GET ACHIEVEMENT PROGRAMS:", error);
    res.status(500).json({ message: 'Gagal mengambil program yang menggunakan achievement ini', error: error.message });
  }
};

// POST create achievement with image
exports.createAchievement = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log("🏆 Creating achievement:");
  console.log("🧾 Data:", { name, description, image });
  console.log("📁 File:", req.file);

  try {
    // Cek apakah achievement dengan nama yang sama sudah ada
    const [existing] = await global.db.query(
      'SELECT achievement_id FROM achievements WHERE name = ?', 
      [name]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        message: 'Achievement dengan nama yang sama sudah ada',
        existing_id: existing[0].achievement_id 
      });
    }

    // Insert achievement baru
    const [result] = await global.db.query(
      'INSERT INTO achievements (name, image, description) VALUES (?, ?, ?)',
      [name, image, description]
    );
    
    console.log("✅ Achievement created successfully, ID:", result.insertId);
    res.status(201).json({ 
      message: 'Achievement berhasil ditambahkan',
      id: result.insertId,
      data: { achievement_id: result.insertId, name, image, description }
    });
  } catch (error) {
    console.error("💥 ERROR INSERT ACHIEVEMENT:", error);
    res.status(500).json({ message: 'Gagal menambahkan achievement', error: error.message });
  }
};

// PUT update achievement with optional new image
exports.updateAchievement = async (req, res) => {
  const { id } = req.params;
  const { name, description, oldImage } = req.body;
  const image = req.file ? req.file.filename : oldImage;

  try {
    console.log("🏆 Updating achievement id:", id);
    console.log("🧾 Data:", { name, description, image });

    // Cek apakah achievement exists
    const [existingAchievement] = await global.db.query('SELECT * FROM achievements WHERE achievement_id = ?', [id]);
    if (existingAchievement.length === 0) {
      return res.status(404).json({ message: 'Achievement tidak ditemukan' });
    }

    // Cek apakah ada achievement lain dengan nama yang sama (kecuali achievement yang sedang diupdate)
    const [duplicateName] = await global.db.query(
      'SELECT achievement_id FROM achievements WHERE name = ? AND achievement_id != ?', 
      [name, id]
    );

    if (duplicateName.length > 0) {
      return res.status(400).json({ 
        message: 'Achievement dengan nama yang sama sudah ada' 
      });
    }

    // Delete old image if new image is uploaded and different from old one
    if (req.file && existingAchievement[0].image && existingAchievement[0].image !== image) {
      const oldPath = path.join(__dirname, "../uploads/achievements", existingAchievement[0].image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("🗑️ Old image deleted:", existingAchievement[0].image);
      }
    }

    // Update achievement
    const [result] = await global.db.query(
      'UPDATE achievements SET name = ?, description = ?, image = ? WHERE achievement_id = ?',
      [name, description, image, id]
    );

    console.log("✅ Achievement updated successfully, affected rows:", result.affectedRows);
    res.status(200).json({ 
      message: "Achievement berhasil diupdate", 
      affectedRows: result.affectedRows,
      data: { achievement_id: id, name, description, image }
    });
  } catch (error) {
    console.error("❌ ERROR UPDATE ACHIEVEMENT:", error);
    res.status(500).json({ message: "Gagal update achievement", error: error.message });
  }
};

// DELETE achievement
exports.deleteAchievement = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("🗑️ Deleting achievement id:", id);
    
    // Cek apakah achievement masih digunakan oleh program
    const [usedByPrograms] = await global.db.query(
      'SELECT COUNT(*) as count FROM program_achievements WHERE achievement_id = ?', 
      [id]
    );

    if (usedByPrograms[0].count > 0) {
      return res.status(400).json({ 
        message: `Achievement tidak dapat dihapus karena masih digunakan oleh ${usedByPrograms[0].count} program`,
        programs_count: usedByPrograms[0].count
      });
    }

    // Get image for deletion
    const [achievement] = await global.db.query('SELECT image FROM achievements WHERE achievement_id = ?', [id]);
    if (achievement.length === 0) {
      return res.status(404).json({ message: 'Achievement tidak ditemukan' });
    }

    // Delete image file if exists
    if (achievement[0].image) {
      const imagePath = path.join(__dirname, "../uploads/achievements", achievement[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑️ Image file deleted:", achievement[0].image);
      }
    }

    // Hapus achievement jika tidak digunakan
    const [result] = await global.db.query('DELETE FROM achievements WHERE achievement_id = ?', [id]);
    
    console.log("✅ Achievement deleted successfully");
    res.status(200).json({ message: 'Achievement berhasil dihapus', affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ ERROR DELETE ACHIEVEMENT:", error);
    res.status(500).json({ message: 'Gagal menghapus achievement', error: error.message });
  }
};

// DELETE achievement with force (hapus beserta relasinya)
exports.forceDeleteAchievement = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("🗑️ Force deleting achievement id:", id);
    
    // Get image for deletion
    const [achievement] = await global.db.query('SELECT image FROM achievements WHERE achievement_id = ?', [id]);
    if (achievement.length === 0) {
      return res.status(404).json({ message: 'Achievement tidak ditemukan' });
    }

    // Delete image file if exists
    if (achievement[0].image) {
      const imagePath = path.join(__dirname, "../uploads/achievements", achievement[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑️ Image file deleted:", achievement[0].image);
      }
    }
    
    // Hapus semua relasi program-achievements terlebih dahulu
    await global.db.query('DELETE FROM program_achievements WHERE achievement_id = ?', [id]);
    
    // Hapus achievement
    const [result] = await global.db.query('DELETE FROM achievements WHERE achievement_id = ?', [id]);
    
    console.log("✅ Achievement force deleted successfully");
    res.status(200).json({ 
      message: 'Achievement dan semua relasinya berhasil dihapus', 
      affectedRows: result.affectedRows 
    });
  } catch (error) {
    console.error("❌ ERROR FORCE DELETE ACHIEVEMENT:", error);
    res.status(500).json({ message: 'Gagal menghapus achievement', error: error.message });
  }
};

// GET achievements stats (berapa program yang menggunakan masing-masing achievement)
exports.claimAchievement = async (req, res) => {
  const userId = req.user.id || req.user.user_id; // jaga-jaga
  const { programId } = req.body;

  try {
    // cek apakah achievement sudah pernah diklaim user
    const [existing] = await global.db.query(
      `SELECT ua.* 
       FROM user_achievements ua
       JOIN program_achievements pa ON ua.achievement_id = pa.achievement_id
       WHERE ua.user_id = ? AND pa.program_id = ?`,
      [userId, programId]
    );

    if (existing.length > 0) {
      return res.json({
        success: false,
        message: "Achievement sudah diklaim sebelumnya",
      });
    }

    // ambil achievement yang terkait dengan program
    const [rows] = await global.db.query(
      `SELECT a.* 
       FROM achievements a
       JOIN program_achievements pa ON a.achievement_id = pa.achievement_id
       WHERE pa.program_id = ?`,
      [programId]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Achievement tidak ditemukan" });
    }

    const achievement = rows[0];

    // insert ke user_achievements
    await global.db.query(
      "INSERT INTO user_achievements (user_id, achievement_id, obtained_at) VALUES (?, ?, NOW())",
      [userId, achievement.achievement_id]
    );

    // 🔥 Tambahin base URL ke image biar bisa dipakai di frontend
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const fullAchievement = {
      ...achievement,
      image: achievement.image
        ? `${baseUrl}/uploads/achievements/${achievement.image}`
        : null,
    };

    res.json({ success: true, achievement: fullAchievement });
  } catch (error) {
    console.error("❌ ERROR CLAIM ACHIEVEMENT:", error);
    res.status(500).json({ success: false, message: "Gagal klaim achievement", error: error.message });
  }
};

// GET achievements milik user (Dashboard user My Achievements)
exports.getUserAchievements = async (req, res) => {
  const userId = req.user?.id || req.user?.user_id; // dari token
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const [rows] = await global.db.query(
      `SELECT a.achievement_id, a.name, a.description,
              CONCAT(?, '/uploads/achievements/', a.image) as image
       FROM user_achievements ua
       JOIN achievements a ON ua.achievement_id = a.achievement_id
       WHERE ua.user_id = ?
       ORDER BY ua.obtained_at DESC`,
      [baseUrl, userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("❌ ERROR GET USER ACHIEVEMENTS:", error);
    res.status(500).json({ message: "Gagal mengambil achievement user" });
  }
};


