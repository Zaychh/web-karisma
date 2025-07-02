const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../database'); // Koneksi MySQL

// [POST] Register - default role user kalau tidak dikirim
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, role],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email atau username sudah digunakan.' });
          }
          console.error('❌ Gagal mendaftar:', err.message);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Registrasi berhasil!' });
      }
    );
  } catch (err) {
    console.error('❌ Error server saat register:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// [POST] Login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Identifier dan password wajib diisi.' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ? OR name = ?',
    [identifier, identifier],
    async (err, results) => {
      if (err) {
        console.error('❌ Gagal login:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

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
    }
  );
});

module.exports = router;
