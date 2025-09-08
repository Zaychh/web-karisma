const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

// ================= Multer Setup =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.user.user_id}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes For User
router.get("/me", verifyToken, async (req, res) => {
  try {
    const [rows] = await global.db.query(
      "SELECT user_id, name, email, image, bio, phone, location FROM users WHERE user_id = ?",
      [req.user.user_id]
    );
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, email, bio, phone, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const updates = [];
    const values = [];

    if (name) updates.push("name = ?") && values.push(name);
    if (email) updates.push("email = ?") && values.push(email);
    if (bio) updates.push("bio = ?") && values.push(bio);
    if (phone) updates.push("phone = ?") && values.push(phone);
    if (location) updates.push("location = ?") && values.push(location);
    if (image) updates.push("image = ?") && values.push(image);

    if (!updates.length) {
      return res.status(400).json({ message: "No data to update" });
    }

    values.push(req.user.user_id);
    const sql = `UPDATE users SET ${updates.join(", ")} WHERE user_id = ?`;
    await global.db.query(sql, values);

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/change-password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.user_id;

  try {
    const [rows] = await global.db.query("SELECT password FROM users WHERE user_id = ?", [userId]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password lama salah" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await global.db.query("UPDATE users SET password = ? WHERE user_id = ?", [hashed, userId]);

    res.json({ message: "Password berhasil diubah" });
  } catch (err) {
    console.error("Gagal mengubah password:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-programs", verifyToken, userController.getMyPrograms);

// ✅ Tambahkan program (FreeClass) ke enrollment user
router.post("/add-program", verifyToken, async (req, res) => {
  try {
    const { program_id } = req.body;
    const userId = req.user.user_id;

    if (!program_id) {
      return res.status(400).json({ error: "program_id wajib dikirim" });
    }

    // 🔍 Cek apakah user sudah terdaftar di program ini
    const [existing] = await global.db.query(
      "SELECT id FROM enrollments WHERE user_id = ? AND program_id = ?",
      [userId, program_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Program sudah ada di inventory" });
    }

    // 🟢 Insert enrollment baru untuk FreeClass
    await global.db.query(
      `INSERT INTO enrollments 
        (user_id, program_id, transaction_id, enrolled_at, status, progress) 
       VALUES (?, ?, NULL, NOW(), 'active', 0.00)`,
      [userId, program_id]
    );

    res.json({ message: "✅ Program berhasil ditambahkan ke inventory" });
  } catch (err) {
    console.error("❌ add-program error:", err);
    res.status(500).json({ error: "Gagal menambahkan program" });
  }
});

// ✅ Cek apakah user sudah terdaftar di program tertentu
router.get("/check-program/:programId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { programId } = req.params;

    const [existing] = await global.db.query(
      "SELECT id FROM enrollments WHERE user_id = ? AND program_id = ? AND status = 'active' LIMIT 1",
      [userId, programId]
    );

    res.json({ isEnrolled: existing.length > 0 });
  } catch (err) {
    console.error("❌ check-program error:", err);
    res.status(500).json({ error: "Gagal memeriksa status program" });
  }
});

// GET Routes (ADMIN-ONLY)
router.get('/', userController.getUsers);                    // GET /api/users - Ambil semua users (exclude admin)
router.get('/role-enum', userController.getRoleEnum);       // GET /api/users/role-enum - Return ['user'] saja
router.get('/role/:role', userController.getUsersByRole);   // GET /api/users/role/user - Hanya allow role 'user'
router.get('/:id', userController.getUserById);             // GET /api/users/1 - Ambil user berdasarkan ID (exclude admin)

// POST Routes
router.post('/', userController.createUser);                // POST /api/users - Buat user baru (hanya role 'user')

// PUT Routes
router.put('/:id', userController.updateUser);              // PUT /api/users/1 - Update user berdasarkan ID (exclude admin)

// DELETE Routes
router.delete('/:id', userController.deleteUser);           // DELETE /api/users/1 - Hapus user berdasarkan ID (exclude admin)

router.patch("/progress/update", verifyToken, userController.updateProgress); // POST /api/users/progress/update
// ✅ Route ini yang dipakai Sidebar detail program yang dibeli user untuk menampilkan progress
router.get('/progress/:user_id/:bootcamp_id', userController.getUserProgress);

module.exports = router;
