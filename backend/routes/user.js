const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

// ============ MULTER SETUP ============
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ⬅️ tetap di folder uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.user.user_id}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ============ GET /api/user/me ============
router.get("/me", verifyToken, async (req, res) => {
  try {
    const [rows] = await global.db.query(
      "SELECT user_id, name, email, image, bio, phone, location FROM users WHERE user_id = ?",
      [req.user.user_id]
    );

    if (!rows.length) return res.status(404).json({ message: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============ PUT /api/user/update ============
router.put("/update", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, email, bio, phone, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const updates = [];
    const values = [];

    if (name) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }
    if (bio) {
      updates.push("bio = ?");
      values.push(bio);
    }
    if (phone) {
      updates.push("phone = ?");
      values.push(phone);
    }
    if (location) {
      updates.push("location = ?");
      values.push(location);
    }
    if (image) {
      updates.push("image = ?");
      values.push(image);
    }

    if (!updates.length) {
      return res.status(400).json({ message: "No data to update" });
    }

    values.push(req.user.user_id); // For WHERE clause

    const sql = `UPDATE users SET ${updates.join(", ")} WHERE user_id = ?`;
    await global.db.query(sql, values);

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============ PUT /api/user/change-password ============
router.put("/change-password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.user_id;

  try {
    // 1. Ambil password lama dari DB
    const [rows] = await global.db.query("SELECT password FROM users WHERE user_id = ?", [userId]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    // 2. Cek apakah oldPassword cocok
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password lama salah" });

    // 3. Hash password baru & update
    const hashed = await bcrypt.hash(newPassword, 10);
    await global.db.query("UPDATE users SET password = ? WHERE user_id = ?", [hashed, userId]);

    res.json({ message: "Password berhasil diubah" });
  } catch (err) {
    console.error("Gagal mengubah password:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
