exports.createMultipleSessions = async (req, res) => {
  try {
    const { id: programId } = req.params;
    const { sessions } = req.body;

    for (const sesi of sessions) {
      await global.db.query(
        `INSERT INTO sesi (id_program, judul_sesi, topik, video) VALUES (?, ?, ?, ?)`,
        [programId, sesi.title, sesi.topic, sesi.video]
      );
    }

    res.status(201).json({ message: "Sesi berhasil ditambahkan" });
  } catch (err) {
    console.error("❌ Gagal menambahkan sesi:", err);
    res.status(500).json({ error: "Gagal menambahkan sesi" });
  }
};

// Tambahkan method ini di sesiController.js
exports.getSesiById = async (req, res) => {
    try {
        const { programId, sesiId } = req.params;
        
        const [rows] = await global.db.query(
            'SELECT id, judul_sesi, topik, video, id_program FROM sesi WHERE id = ? AND id_program = ?',
            [sesiId, programId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ 
                error: "Sesi tidak ditemukan" 
            });
        }

        // Transform data untuk match dengan interface frontend
        const sesi = {
            id: rows[0].id,
            judul: rows[0].judul_sesi,
            topik: rows[0].topik,
            linkVideo: rows[0].video,
            programId: rows[0].id_program
        };

        res.json(sesi);
    } catch (err) {
        console.error("❌ Gagal mengambil detail sesi:", err);
        res.status(500).json({ 
            error: "Gagal mengambil detail sesi", 
            detail: err.message 
        });
    }
};

// Tambahkan method ini di sesiController.js
exports.updateSesi = async (req, res) => {
    try {
        const { programId, sesiId } = req.params;
        const { judul, topik, linkVideo } = req.body;

        // Validasi input
        if (!judul || !topik || !linkVideo) {
            return res.status(400).json({
                error: "Semua field (judul, topik, linkVideo) harus diisi"
            });
        }

        // Cek apakah sesi exists
        const [existingSesi] = await global.db.query(
            'SELECT id FROM sesi WHERE id = ? AND id_program = ?',
            [sesiId, programId]
        );

        if (existingSesi.length === 0) {
            return res.status(404).json({
                error: "Sesi tidak ditemukan"
            });
        }

        // Update sesi
        await global.db.query(
            'UPDATE sesi SET judul_sesi = ?, topik = ?, video = ? WHERE id = ? AND id_program = ?',
            [judul, topik, linkVideo, sesiId, programId]
        );

        // Get updated data
        const [updatedSesi] = await global.db.query(
            'SELECT id, judul_sesi, topik, video, id_program FROM sesi WHERE id = ? AND id_program = ?',
            [sesiId, programId]
        );

        // Transform data untuk response
        const responseData = {
            id: updatedSesi[0].id,
            judul: updatedSesi[0].judul_sesi,
            topik: updatedSesi[0].topik,
            linkVideo: updatedSesi[0].video,
            programId: updatedSesi[0].id_program
        };

        res.json({
            message: "Sesi berhasil diperbarui",
            data: responseData
        });

    } catch (err) {
        console.error("❌ Gagal memperbarui sesi:", err);
        res.status(500).json({
            error: "Gagal memperbarui sesi",
            detail: err.message
        });
    }
};

// Update method getSesiByProgramId untuk include video
exports.getSesiByProgramId = async (req, res) => {
    try {
        const programId = req.params.id;
        const [rows] = await global.db.query(
            'SELECT id, judul_sesi, topik, video FROM sesi WHERE id_program = ?',
            [programId]
        );

        // Transform data untuk match dengan interface frontend
        const sesiList = rows.map(row => ({
            id: row.id,
            judul: row.judul_sesi,
            topik: row.topik,
            linkVideo: row.video,
            programId: parseInt(programId)
        }));

        res.json(sesiList);
    } catch (err) {
        console.error("❌ Gagal mengambil sesi:", err);
        res.status(500).json({ error: "Gagal mengambil sesi", detail: err.message });
    }
};

// Tambahkan method ini di sesiController.js
exports.deleteSesi = async (req, res) => {
    try {
        const { programId, sesiId } = req.params;

        // Cek apakah sesi exists
        const [existingSesi] = await global.db.query(
            'SELECT id, judul_sesi FROM sesi WHERE id = ? AND id_program = ?',
            [sesiId, programId]
        );

        if (existingSesi.length === 0) {
            return res.status(404).json({
                error: "Sesi tidak ditemukan"
            });
        }

        // Delete sesi
        const [result] = await global.db.query(
            'DELETE FROM sesi WHERE id = ? AND id_program = ?',
            [sesiId, programId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Sesi tidak ditemukan atau sudah dihapus"
            });
        }

        res.json({
            message: "Sesi berhasil dihapus",
            deletedSesi: {
                id: parseInt(sesiId),
                judul: existingSesi[0].judul_sesi
            }
        });

    } catch (err) {
        console.error("❌ Gagal menghapus sesi:", err);
        res.status(500).json({
            error: "Gagal menghapus sesi",
            detail: err.message
        });
    }
};

// Di bagian exports, pastikan semua method ter-export
module.exports = {
    getSesiByProgramId: exports.getSesiByProgramId,
    createMultipleSessions: exports.createMultipleSessions,
    getSesiById: exports.getSesiById,
    updateSesi: exports.updateSesi,  // Tambahkan ini
    deleteSesi: exports.deleteSesi,
};