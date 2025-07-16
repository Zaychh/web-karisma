const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const db = require('../database'); // Hapus ini

// [POST] Register - pakai global.db
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    
    // Pakai global.db dan execute (untuk mysql2/promise)
    const [result] = await global.db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, role]
    );
    
    res.status(201).json({ message: 'Registrasi berhasil!' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email atau username sudah digunakan.' });
    }
    console.error('❌ Error server saat register:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// [POST] Login - pakai global.db
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Identifier dan password wajib diisi.' });
  }

  try {
    const [results] = await global.db.execute(
      'SELECT * FROM users WHERE email = ? OR name = ?',
      [identifier, identifier]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error('❌ Gagal login:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;