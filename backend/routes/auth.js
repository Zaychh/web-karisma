const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware validasi email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Middleware validasi password strength
const validatePassword = (password) => {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
};

// Middleware auth token (dengan mapping id + user_id)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Token tidak ditemukan.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');

    // 🔑 Mapping biar backward compatible
    req.user = {
      id: decoded.id || decoded.user_id,
      user_id: decoded.user_id || decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token sudah expired. Silakan login kembali.',
        code: 'TOKEN_EXPIRED'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid.',
        code: 'INVALID_TOKEN'
      });
    }
  }
};

// Middleware admin-only
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin access required.'
    });
  }
  next();
};

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, dan password wajib diisi.'
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Format email tidak valid.'
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password minimal 8 karakter dan harus mengandung huruf serta angka.'
    });
  }

  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Nama harus antara 2-50 karakter.'
    });
  }

  try {
    const [existingUser] = await global.db.execute(
      'SELECT user_id FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah digunakan.'
      });
    }

    const [existingName] = await global.db.execute(
      'SELECT user_id FROM users WHERE name = ?',
      [name]
    );

    if (existingName.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Username sudah digunakan.'
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const [result] = await global.db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email.toLowerCase(), hashed, role]
    );

    console.log(`✅ New user registered: ${name} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil!',
      user_id: result.insertId
    });
  } catch (err) {
    console.error('❌ Error server saat register:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server. Silakan coba lagi.'
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email/username dan password wajib diisi.'
    });
  }

  try {
    const [results] = await global.db.execute(
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?) OR name = ?',
      [identifier, identifier]
    );

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email/username atau password salah.'
      });
    }

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: 'Email/username atau password salah.'
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-secret-key-here',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        phone: user.phone,
        location: user.location,
        image: user.image
      }
    });
  } catch (err) {
    console.error('❌ Gagal login:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server. Silakan coba lagi.'
    });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await global.db.execute(
      'SELECT user_id, name, email, role, bio, phone, location, image FROM users WHERE user_id = ?',
      [req.user.user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    const user = users[0];

    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error('❌ Error getting user info:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  const { name, bio, phone, location } = req.body;
  const userId = req.user.user_id;

  try {
    if (name && (name.length < 2 || name.length > 50)) {
      return res.status(400).json({
        success: false,
        message: 'Nama harus antara 2-50 karakter.'
      });
    }

    if (name && name !== req.user.name) {
      const [existingName] = await global.db.execute(
        'SELECT user_id FROM users WHERE name = ? AND user_id != ?',
        [name, userId]
      );

      if (existingName.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Username sudah digunakan.'
        });
      }
    }

    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (bio !== undefined) {
      updateFields.push('bio = ?');
      updateValues.push(bio);
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (location !== undefined) {
      updateFields.push('location = ?');
      updateValues.push(location);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diubah.'
      });
    }

    updateValues.push(userId);

    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ?`;
    await global.db.execute(query, updateValues);

    const [updatedUser] = await global.db.execute(
      'SELECT user_id, name, email, role, bio, phone, location, image FROM users WHERE user_id = ?',
      [userId]
    );

    res.json({
      success: true,
      message: 'Profile berhasil diupdate',
      user: updatedUser[0]
    });

  } catch (err) {
    console.error('❌ Error updating profile:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate profile.'
    });
  }
});

// Change password
router.post('/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.user_id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Password lama dan password baru wajib diisi.'
    });
  }

  if (!validatePassword(newPassword)) {
    return res.status(400).json({
      success: false,
      message: 'Password baru minimal 8 karakter dan harus mengandung huruf serta angka.'
    });
  }

  try {
    const [users] = await global.db.execute(
      'SELECT password FROM users WHERE user_id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.'
      });
    }

    const validOldPassword = await bcrypt.compare(currentPassword, users[0].password);

    if (!validOldPassword) {
      return res.status(401).json({
        success: false,
        message: 'Password lama tidak sesuai.'
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await global.db.execute(
      'UPDATE users SET password = ? WHERE user_id = ?',
      [hashedNewPassword, userId]
    );

    res.json({
      success: true,
      message: 'Password berhasil diubah'
    });

  } catch (err) {
    console.error('❌ Error changing password:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengubah password.'
    });
  }
});

// Logout
router.post('/logout', authenticateToken, (req, res) => {
  console.log(`✅ User ${req.user.name} logged out`);
  res.json({
    success: true,
    message: 'Logout berhasil'
  });
});

// Refresh token
router.post('/refresh', authenticateToken, (req, res) => {
  try {
    const newToken = jwt.sign(
      {
        user_id: req.user.user_id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      },
      process.env.JWT_SECRET || 'your-secret-key-here',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Token berhasil diperbarui',
      token: newToken
    });

  } catch (err) {
    console.error('❌ Error refreshing token:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui token.'
    });
  }
});

// Debug endpoint (dev only)
router.get('/debug/users', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }

  try {
    const [users] = await global.db.execute(
      'SELECT user_id, name, email, role FROM users'
    );
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Debug users error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Export router and middlewares
module.exports = {
  router,
  authenticateToken,
  requireAdmin
};
