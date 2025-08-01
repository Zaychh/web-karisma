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



exports.getSesiByProgramId = async (req, res) => {
    try {
        const programId = req.params.id; // ambil dari :id di URL
        const [rows] = await global.db.query(
            'SELECT id, judul_sesi, topik FROM sesi WHERE id_program = ?',
            [programId]
        );

        res.json(rows);
    } catch (err) {
        console.error("❌ Gagal mengambil sesi:", err);
        res.status(500).json({ error: "Gagal mengambil sesi", detail: err.message });
    }
};
