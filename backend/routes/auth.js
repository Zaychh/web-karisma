const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// [POST] Register - hanya untuk role 'user'
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body; // Remove role dari parameter
  const role = 'user'; // Force role menjadi 'user'

  // Validasi input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, dan password wajib diisi.' });
  }

  try {
    // Cek apakah email sudah ada
    const [existingUser] = await global.db.execute(
      'SELECT user_id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email sudah digunakan.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    
    // Insert user baru (hanya role 'user')
    const [result] = await global.db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, role]
    );
    
    res.status(201).json({ 
      success: true,
      message: 'Registrasi berhasil!',
      user_id: result.insertId 
    });
  } catch (err) {
    console.error('❌ Error server saat register:', err);
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong' 
    });
  }
});

// [POST] Login - untuk user dan admin dengan redirect
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  console.log('🔍 LOGIN REQUEST RECEIVED:');
  console.log('- Body:', req.body);
  console.log('- Identifier:', identifier);
  console.log('- Password:', password);
  console.log('- Headers:', req.headers);

if (!identifier || !password) {
    console.log('❌ Missing identifier or password');
    return res.status(400).json({ 
      success: false,
      message: 'Email/username dan password wajib diisi.' 
    });
  }

  try {
    // DEBUG: Log database query
    console.log('🔍 SEARCHING DATABASE WITH:');
    console.log('- Query: SELECT * FROM users WHERE email = ? OR name = ?');
    console.log('- Parameters:', [identifier, identifier]);

    // Cari user berdasarkan email atau name (termasuk admin)
    const [results] = await global.db.execute(
      'SELECT * FROM users WHERE email = ? OR name = ?',
      [identifier, identifier]
    );

    // DEBUG: Log query results
    console.log('🔍 DATABASE QUERY RESULTS:');
    console.log('- Results count:', results.length);
    if (results.length > 0) {
      console.log('- Found user:', {
        user_id: results[0].user_id,
        name: results[0].name,
        email: results[0].email,
        role: results[0].role
      });
    }

    if (results.length === 0) {
      console.log('❌ USER NOT FOUND');
      return res.status(401).json({ 
        success: false,
        message: 'User tidak ditemukan' 
      });
    }

    const user = results[0];
    
    // DEBUG: Log password comparison
    console.log('🔍 PASSWORD VERIFICATION:');
    console.log('- Input password:', password);
    console.log('- Stored hash length:', user.password ? user.password.length : 'null');
    
    const valid = await bcrypt.compare(password, user.password);
    console.log('- Password valid:', valid);
    
    if (!valid) {
      console.log('❌ PASSWORD MISMATCH');
      return res.status(401).json({ 
        success: false,
        message: 'Password salah' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'your-secret-key-here',
      { expiresIn: '24h' } // Extend ke 24 jam
    );

    // Tentukan redirect URL berdasarkan role
    let redirectUrl;
    if (user.role === 'admin') {
      redirectUrl = '/admin/dashboard'; // URL untuk admin panel
    } else {
      redirectUrl = '/user/dashboard';  // URL untuk user dashboard
    }

    // Response sukses dengan redirect info
    res.status(200).json({ 
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      redirectUrl
    });
  } catch (err) {
    console.error('❌ Gagal login:', err);
    res.status(500).json({ 
      success: false,
      message: 'Internal Server Error' 
    });
  }
});

router.get('/debug/users', async (req, res) => {
  try {
    const [users] = await global.db.execute('SELECT user_id, name, email, role FROM users');
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

// [POST] Logout
router.post('/logout', (req, res) => {
  // Karena JWT stateless, logout hanya perlu clear token di client
  res.json({
    success: true,
    message: 'Logout berhasil'
  });
});

// [GET] Get current user info
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'No token provided' 
    });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');
    
    const [users] = await global.db.execute(
      'SELECT user_id, name, email, role FROM users WHERE user_id = ?',
      [decoded.user_id]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (err) {
    console.error('❌ Error verify token:', err);
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
});

// Middleware untuk protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
};

// Middleware untuk protect admin routes
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. Admin role required.' 
    });
  }
  next();
};

// Export router dan middleware
module.exports = router;
module.exports.authenticateToken = authenticateToken;
module.exports.requireAdmin = requireAdmin;