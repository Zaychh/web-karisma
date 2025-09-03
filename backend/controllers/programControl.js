const { error } = require("console");
const path = require("path");

// === POST /api/program – Tambah Program
exports.createProgram = async (req, res) => {
  try {
    console.log("=== DEBUG CREATE ===");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { title, deskripsi, harga, categories, instructor_id, tool_ids, achievement_ids } = req.body;
    const image_cover = req.file ? req.file.filename : null;
    console.log("Image Cover:", image_cover);
    console.log("Instructor ID:", instructor_id);
    console.log("Tool IDs:", tool_ids);
    console.log("Achievement IDs:", achievement_ids);

    // Insert program
    const [result] = await global.db.query(
      `INSERT INTO program (title, deskripsi, harga, categories, instructor_id, image_cover)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, deskripsi, harga, categories, instructor_id || null, image_cover]
    );

    const programId = result.insertId;

    // Insert program-tools relations jika ada tool_ids
    if (tool_ids && Array.isArray(tool_ids) && tool_ids.length > 0) {
      const toolInserts = tool_ids.map(toolId => [programId, toolId]);
      await global.db.query(
        `INSERT INTO program_tools (program_id, tool_id) VALUES ?`,
        [toolInserts]
      );
      console.log("✅ Program-tools relations created");
    }

    if (achievement_ids && Array.isArray(achievement_ids) && achievement_ids.length > 0) {
      const achievementInserts = achievement_ids.map(achievementId => [programId, achievementId]);
      await global.db.query(
        `INSERT INTO program_achievements (program_id, achievement_id) VALUES ?`,
        [achievementInserts]
      );
      console.log("✅ Program-achievements relations created");
    }

    res.status(201).json({
      message: "Program berhasil dibuat",
      program_id: programId,
    });
  } catch (err) {
    console.error("❌ Gagal create program:", err);
    res.status(500).json({ error: "Gagal create program", detail: err.message });
  }
};

// === GET /api/program – Ambil Semua Program
exports.getAllPrograms = async (req, res) => {
  try {
    const [rows] = await global.db.query(
      `SELECT p.*, i.name as instructor_name, i.mastery as instructor_mastery 
       FROM program p 
       LEFT JOIN instructor i ON p.instructor_id = i.instructor_id 
       ORDER BY p.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ getAllPrograms error:", err);
    res.status(500).json({ error: "Gagal mengambil data program" });
  }
};

// === GET /api/program/bootcamp – Ambil Semua Program Kategori Bootcamp
exports.getBootcampPrograms = async (req, res) => {
  try {
    const [rows] = await global.db.query(
      `SELECT 
        p.program_id, p.title, p.career_title, p.harga, p.categories, p.deskripsi, p.deskripsi_2, p.image_cover,
        i.name as instructor_name, i.image as instructor_image, i.mastery as instructor_mastery
       FROM program p
       LEFT JOIN instructor i ON p.instructor_id = i.instructor_id
       WHERE p.categories = 'bootcamp'
       ORDER BY p.created_at DESC`
    );

    // Generate slug dari title
   const dataWithSlug = await Promise.all(rows.map(async (row) => {
  // Ambil skills dari program_skills
  const [skills] = await global.db.query(`
    SELECT s.name FROM skills s
    JOIN program_skills ps ON s.skill_id = ps.skill_id
    WHERE ps.program_id = ?
  `, [row.program_id]);

  return {
    ...row,
    slug: row.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
    image_cover: `uploads/cover/${row.image_cover}`,
    skills: skills.map((s) => s.name), // ← skill names only
    desc1: row.deskripsi,
    desc2: row.deskripsi_2,
  };
}));

res.json(dataWithSlug);

  } catch (err) {
    console.error("❌ getBootcampPrograms error:", err);
    res.status(500).json({ error: "Gagal mengambil bootcamp" });
  }
};


// === GET /api/program/:id – Ambil Detail Lengkap Program (UPDATED VERSION)
exports.getProgramById = async (req, res) => {
  try {
    const programId = req.params.id;
    console.log("=== START DEBUG getProgramById ===");
    console.log("Requested Program ID:", programId);

    // 1. Ambil data program
    const [programRows] = await global.db.query(
      `SELECT * FROM program WHERE program_id = ?`,
      [programId]
    );

    if (!programRows.length) {
      return res.status(404).json({ error: "Program tidak ditemukan" });
    }

    const program = programRows[0];
    console.log("Program found:", program.title);

    // 2. Ambil instructor
    let instructor = {
      name: "Tidak diketahui",
      image: "",
      mastery: "",
    };

    if (program.instructor_id) {
      const [instructorRows] = await global.db.query(
        `SELECT name, image, mastery FROM instructor WHERE instructor_id = ?`,
        [program.instructor_id]
      );
      
      if (instructorRows.length > 0) {
        instructor = instructorRows[0];
      }
    }

    // 3. Ambil tools untuk program ini
    console.log("=== FETCHING PROGRAM TOOLS ===");
    const [toolsRows] = await global.db.query(`
      SELECT t.id, t.judul as name, t.image, t.deskripsi
      FROM tools t
      JOIN program_tools pt ON t.id = pt.tool_id  
      WHERE pt.program_id = ?
    `, [programId]);

    console.log("Tools found:", toolsRows.length);

    // 4. Ambil achievements untuk program ini
    console.log("=== FETCHING PROGRAM ACHIEVEMENTS ===");
    const [achievementsRows] = await global.db.query(`
      SELECT a.achievement_id, a.name, a.image, a.description
      FROM achievements a
      JOIN program_achievements pa ON a.achievement_id = pa.achievement_id  
      WHERE pa.program_id = ?
      ORDER BY a.name ASC
    `, [programId]);

    console.log("Achievements found:", achievementsRows.length);
    console.log("Achievements data:", achievementsRows);

    const response = {
      ...program,
      instructor: {
        name: instructor.name,
        majority: instructor.mastery,
        image: instructor.image
      },
      tools: toolsRows,
      achievements: achievementsRows  // Tambahkan achievements ke response
    };

    console.log("=== FINAL RESPONSE ===");
    console.log("Response tools:", response.tools.length);
    console.log("Response achievements:", response.achievements.length);
    console.log("=====================");

    res.json(response);
  } catch (err) {
    console.error("❌ getProgramById error:", err);
    res.status(500).json({ error: "Gagal mengambil program" });
  }
};

// === PUT /api/program/:id – Update Program (FIXED VERSION)
exports.updateProgram = async (req, res) => {
  const connection = await global.db.getConnection();
  
  try {
    console.log("=== DEBUG UPDATE PROGRAM ===");
    console.log("Program ID:", req.params.id);
    console.log("Raw body:", req.body);

    const { title, deskripsi, harga, categories, instructor_id, tool_ids, achievement_ids } = req.body;
    const programId = req.params.id;
    const image_cover = req.file?.filename || null;

    console.log("Extracted data:");
    console.log("- Title:", title);
    console.log("- Tool IDs raw:", tool_ids);
    console.log("- Achievement IDs raw:", achievement_ids);

    // Parse tool_ids jika dalam bentuk JSON string
    let parsedToolIds = [];
    if (tool_ids) {
      try {
        if (typeof tool_ids === 'string') {
          parsedToolIds = JSON.parse(tool_ids);
        } else if (Array.isArray(tool_ids)) {
          parsedToolIds = tool_ids;
        }
        console.log("- Parsed Tool IDs:", parsedToolIds);
      } catch (parseError) {
        console.error("Error parsing tool_ids:", parseError);
        parsedToolIds = [];
      }
    }
    
    // Parse achievement_ids jika dalam bentuk JSON string
    let parsedAchievementIds = [];
    if (achievement_ids) {
      try {
        if (typeof achievement_ids === 'string') {
          parsedAchievementIds = JSON.parse(achievement_ids);
        } else if (Array.isArray(achievement_ids)) {
          parsedAchievementIds = achievement_ids;
        }
        console.log("- Parsed Achievement IDs:", parsedAchievementIds);
      } catch (parseError) {
        console.error("Error parsing achievement_ids:", parseError);
        parsedAchievementIds = [];
      }
    }

    // Start transaction
    await connection.beginTransaction();

    // 1. Update program basic info
    let updateSql = `UPDATE program SET title = ?, deskripsi = ?, harga = ?, categories = ?, instructor_id = ?`;
    const updateParams = [title, deskripsi, harga, categories, instructor_id || null];

    if (image_cover) {
      updateSql += `, image_cover = ?`;
      updateParams.push(image_cover);
    }

    updateSql += ` WHERE program_id = ?`;
    updateParams.push(programId);

    console.log("Updating program with SQL:", updateSql);
    await connection.execute(updateSql, updateParams);
    console.log("✅ Program basic info updated");

    // 2. Update program-tools relations
    console.log("=== UPDATING TOOLS RELATIONS ===");
    
    // Hapus semua relasi tools yang lama
    const deleteToolsResult = await connection.execute(
      `DELETE FROM program_tools WHERE program_id = ?`,
      [programId]
    );
    console.log("Deleted tools relations:", deleteToolsResult[0].affectedRows);

    // Insert relasi tools yang baru jika ada
    if (parsedToolIds && parsedToolIds.length > 0) {
      const toolInserts = parsedToolIds.map(toolId => [programId, parseInt(toolId)]);
      await connection.query(
        `INSERT INTO program_tools (program_id, tool_id) VALUES ?`,
        [toolInserts]
      );
      console.log("✅ Program-tools relations inserted successfully");
    }
    
    // 3. Update program-achievements relations ⭐ INI YANG DIPERBAIKI ⭐
    console.log("=== UPDATING ACHIEVEMENTS RELATIONS ===");
    
    // 🔥 HAPUS ACHIEVEMENTS LAMA DULU (INI YANG MISSING!)
    const deleteAchievementsResult = await connection.execute(
      `DELETE FROM program_achievements WHERE program_id = ?`,
      [programId]
    );
    console.log("Deleted achievements relations:", deleteAchievementsResult[0].affectedRows);
    
    // Insert relasi achievements yang baru jika ada
    if (parsedAchievementIds && parsedAchievementIds.length > 0) {
      console.log("Inserting new achievement relations:", parsedAchievementIds);
      
      const achievementInserts = parsedAchievementIds.map(achievementId => [programId, parseInt(achievementId)]);
      console.log("Achievement inserts data:", achievementInserts);
      
      const insertAchievementResult = await connection.query(
        `INSERT INTO program_achievements (program_id, achievement_id) VALUES ?`,
        [achievementInserts]
      );
      
      console.log("Achievement insert result:", insertAchievementResult[0]);
      console.log("✅ Program-achievements relations inserted successfully");
    } else {
      console.log("No achievements to insert");
    }

    // Commit transaction
    await connection.commit();
    console.log("✅ Transaction committed");

    // Verify the update
    console.log("=== VERIFICATION ===");
    const [verifyTools] = await connection.execute(
      `SELECT tool_id FROM program_tools WHERE program_id = ?`,
      [programId]
    );

    const [verifyAchievements] = await connection.execute(
      `SELECT achievement_id FROM program_achievements WHERE program_id = ?`,
      [programId]
    );
    
    console.log("Tools in database after update:", verifyTools);
    console.log("Achievements in database after update:", verifyAchievements);

    res.json({ 
      success: true,
      message: "Program berhasil diperbarui",
      updated_tools: verifyTools,
      updated_achievements: verifyAchievements 
    });

  } catch (err) {
    // Rollback transaction on error
    await connection.rollback();
    console.error("❌ updateProgram error:", err);
    res.status(500).json({ 
      error: "Gagal memperbarui program", 
      detail: err.message 
    });
  } finally {
    // Release connection
    connection.release();
  }
};

// === DELETE /api/program/:id – Hapus Program
exports.deleteProgram = async (req, res) => {
  try {
    const programId = req.params.id;

    // 1. Hapus relasi program-tools terlebih dahulu
    await global.db.query(
      `DELETE FROM program_tools WHERE program_id = ?`,
      [programId]
    );

    // 2. Hapus program
    await global.db.query(
      `DELETE FROM program WHERE program_id = ?`,
      [programId]
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

// === GET /api/program/:id/tools – Ambil Tools untuk Program Tertentu
exports.getProgramTools = async (req, res) => {
  try {
    const programId = req.params.id;
    
    const [tools] = await global.db.query(`
      SELECT t.id, t.judul as, t.image, t.deskripsi
      FROM tools t
      JOIN program_tools pt ON t.id = pt.tool_id  
      WHERE pt.program_id = ?
    `, [programId]);

    res.json(tools);
  } catch (err) {
    console.error("❌ getProgramTools error:", err);
    res.status(500).json({ error: "Gagal mengambil tools program" });
  }
};

// === POST /api/program/:id/tools – Tambah Tool ke Program
exports.addToolToProgram = async (req, res) => {
  try {
    const { id: programId } = req.params;
    const { tool_id } = req.body;

    // Cek apakah relasi sudah ada
    const [existing] = await global.db.query(
      `SELECT * FROM program_tools WHERE program_id = ? AND tool_id = ?`,
      [programId, tool_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Tool sudah ditambahkan ke program ini" });
    }

    // Insert relasi baru
    await global.db.query(
      `INSERT INTO program_tools (program_id, tool_id) VALUES (?, ?)`,
      [programId, tool_id]
    );

    res.json({ message: "Tool berhasil ditambahkan ke program" });
  } catch (err) {
    console.error("❌ addToolToProgram error:", err);
    res.status(500).json({ error: "Gagal menambahkan tool ke program" });
  }
};

// === DELETE /api/program/:id/tools/:toolId – Hapus Tool dari Program  
exports.removeToolFromProgram = async (req, res) => {
  try {
    const { id: programId, toolId } = req.params;

    const [result] = await global.db.query(
      `DELETE FROM program_tools WHERE program_id = ? AND tool_id = ?`,
      [programId, toolId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Relasi tool-program tidak ditemukan" });
    }

    res.json({ message: "Tool berhasil dihapus dari program" });
  } catch (err) {
    console.error("❌ removeToolFromProgram error:", err);
    res.status(500).json({ error: "Gagal menghapus tool dari program" });
  }
};

// === GET /api/program/:id/achievements – Ambil Achievements untuk Program Tertentu
exports.getProgramAchievements = async (req, res) => {
  try {
    const programId = req.params.id;
    console.log("=== FETCHING PROGRAM ACHIEVEMENTS ===");
    console.log("Program ID:", programId);
    
    const [achievements] = await global.db.query(`
      SELECT a.achievement_id, a.name, a.image, a.description
      FROM achievements a
      JOIN program_achievements pa ON a.achievement_id = pa.achievement_id  
      WHERE pa.program_id = ?
      ORDER BY a.name ASC
    `, [programId]);

    console.log("Achievements found:", achievements.length);
    console.log("Achievements data:", achievements);
    
    res.json(achievements);
  } catch (err) {
    console.error("❌ getProgramAchievements error:", err);
    res.status(500).json({ error: "Gagal mengambil achievements program" });
  }
};

// === POST /api/program/:id/achievements – Tambah Achievement ke Program
exports.addAchievementToProgram = async (req, res) => {
  try {
    const { id: programId } = req.params;
    const { achievement_id } = req.body;

    console.log("Adding achievement to program:", { programId, achievement_id });

    // Cek apakah relasi sudah ada
    const [existing] = await global.db.query(
      `SELECT * FROM program_achievements WHERE program_id = ? AND achievement_id = ?`,
      [programId, achievement_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Achievement sudah ditambahkan ke program ini" });
    }

    // Insert relasi baru
    await global.db.query(
      `INSERT INTO program_achievements (program_id, achievement_id) VALUES (?, ?)`,
      [programId, achievement_id]
    );

    console.log("✅ Achievement added to program successfully");
    res.json({ message: "Achievement berhasil ditambahkan ke program" });
  } catch (err) {
    console.error("❌ addAchievementToProgram error:", err);
    res.status(500).json({ error: "Gagal menambahkan achievement ke program" });
  }
};

// === DELETE /api/program/:id/achievements/:achievementId – Hapus Achievement dari Program  
exports.removeAchievementFromProgram = async (req, res) => {
  try {
    const { id: programId, achievementId } = req.params;

    console.log("Removing achievement from program:", { programId, achievementId });

    const [result] = await global.db.query(
      `DELETE FROM program_achievements WHERE program_id = ? AND achievement_id = ?`,
      [programId, achievementId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Relasi achievement-program tidak ditemukan" });
    }

    console.log("✅ Achievement removed from program successfully");
    res.json({ message: "Achievement berhasil dihapus dari program" });
  } catch (err) {
    console.error("❌ removeAchievementFromProgram error:", err);
    res.status(500).json({ error: "Gagal menghapus achievement dari program" });
  }
};

// === GET /api/program/:id/facts – Ambil Fakta untuk Program Tertentu
exports.getProgramFacts = async (req, res) => {
  try {
    const { id: programId } = req.params;

    const [facts] = await global.db.query(`
      SELECT text FROM program_facts
      WHERE program_id = ?
      ORDER BY id ASC
    `, [programId]);

    res.json(facts.map(f => f.text)); // return array of string
  } catch (err) {
    console.error("❌ getProgramFacts error:", err);
    res.status(500).json({ error: "Gagal mengambil fakta program" });
  }
};

// GET /api/program/:id/jobs
exports.getProgramJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const [jobs] = await global.db.query(
      `SELECT company, position, type, salary, link FROM program_jobs WHERE program_id = ?`,
      [id]
    );
    res.json(jobs);
  } catch (err) {
    console.error("❌ getProgramJobs error:", err);
    res.status(500).json({ error: "Gagal mengambil data jobs" });
  }
};

// === GET /api/program/:id/pricing
exports.getProgramPricing = async (req, res) => {
  try {
    const { id } = req.params;

    const [pricings] = await global.db.query(`
      SELECT pp.pricing_id, pp.name, pp.price, pp.original_price, pp.is_main,
             pb.benefit
      FROM program_pricing pp
      LEFT JOIN pricing_benefits pb ON pb.pricing_id = pp.pricing_id
      WHERE pp.program_id = ?
    `, [id]);

    const result = {};

    for (const row of pricings) {
      const pid = row.pricing_id;
      if (!result[pid]) {
        result[pid] = {
          pricing_id: pid,
          name: row.name,
          price: row.price,
          originalPrice: row.original_price,
          isMain: !!row.is_main,
          benefits: [],
        };
      }
      if (row.benefit) result[pid].benefits.push(row.benefit);
    }

    res.json(Object.values(result));
  } catch (err) {
    console.error("❌ getProgramPricing error:", err);
    res.status(500).json({ error: "Gagal ambil data pricing" });
  }
};


// ROUTE YANG PERLU DITAMBAHKAN DI program.js:
// === Route untuk Program-Achievements ===
// router.get("/:id/achievements", programController.getProgramAchievements);           // GET achievements dalam program
// router.post("/:id/achievements", programController.addAchievementToProgram);         // POST tambah achievement ke program
// router.delete("/:id/achievements/:achievementId", programController.removeAchievementFromProgram); // DELETE achievement dari program