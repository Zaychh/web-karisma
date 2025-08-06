const bcrypt = require('bcrypt');

// GET - Mengambil semua users (exclude admin)
exports.getUsers = async (req, res) => {
  const db = global.db;
  try {
    const [results] = await db.query('SELECT user_id, name, email, role FROM users WHERE role = "user"');
    res.json(results);
  } catch (err) {
    console.error('[ERROR] getUsers:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET - Mengambil user berdasarkan ID (exclude admin)
exports.getUserById = async (req, res) => {
  const db = global.db;
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const [results] = await db.query('SELECT user_id, name, email, role FROM users WHERE user_id = ? AND role = "user"', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('[ERROR] getUserById:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// POST - Membuat user baru (hanya role 'user')
exports.createUser = async (req, res) => {
  const db = global.db;
  const { name, email, password } = req.body;
  const role = 'user'; // Force role menjadi 'user'

  // Validasi input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  try {
    // Cek apakah email sudah ada
    const [existingUser] = await db.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user baru (hanya dengan role 'user')
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ 
      message: 'User created successfully',
      user_id: result.insertId,
      name,
      email,
      role
    });
  } catch (err) {
    console.error('[ERROR] createUser:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// PUT - Update user berdasarkan ID (exclude admin)
exports.updateUser = async (req, res) => {
  const db = global.db;
  const id = req.params.id;
  const { name, email, password } = req.body; // Remove role dari parameter

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    // Cek apakah user exists dan bukan admin
    const [existingUser] = await db.query(
      'SELECT user_id FROM users WHERE user_id = ? AND role = "user"',
      [id]
    );
    if (existingUser.length === 0) {
      return res
        .status(404)
        .json({ error: "User not found or cannot modify admin" });
    }

    // ❌ Jangan izinkan update email sama sekali
    if (email) {
      console.log("⚠️ Attempt to update email was ignored.");
    }

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Bangun query update dinamis
    let sql = "UPDATE users SET ";
    const params = [];
    const updates = [];

    if (name) {
      updates.push("name = ?");
      params.push(name);
    }

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updates.push("password = ?");
      params.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    sql += updates.join(", ") + ' WHERE user_id = ? AND role = "user"';
    params.push(id);

    const [result] = await db.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error('[ERROR] updateUser:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE - Hapus user berdasarkan ID (exclude admin)
exports.deleteUser = async (req, res) => {
  const db = global.db;
  const id = req.params.id;
  
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    // Cek apakah user exists dan bukan admin
    const [existingUser] = await db.query('SELECT user_id FROM users WHERE user_id = ? AND role != "admin"', [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found or cannot delete admin' });
    }

    const [result] = await db.query('DELETE FROM users WHERE user_id = ? AND role = "user"', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('[ERROR] deleteUser:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// GET - Mengambil enum values untuk role (hanya return 'user' karena admin tidak untuk CRUD)
exports.getRoleEnum = async (req, res) => {
  try {
    // Karena admin singleton dan tidak untuk CRUD, hanya return 'user'
    res.json(['user']);
  } catch (err) {
    console.error('[ERROR] getRoleEnum:', err);
    res.status(500).json({ error: 'Failed to fetch role enum' });
  }
};

// GET - Mengambil semua users dengan role 'user' saja
exports.getUsersByRole = async (req, res) => {
  const db = global.db;
  const { role } = req.params;

  // Hanya allow role 'user' untuk CRUD operations
  if (role !== 'user') {
    return res.status(400).json({ error: 'Only "user" role is allowed for CRUD operations' });
  }

  try {
    const [results] = await db.query('SELECT user_id, name, email, role FROM users WHERE role = "user"', []);
    res.json(results);
  } catch (err) {
    console.error('[ERROR] getUsersByRole:', err);
    res.status(500).json({ error: 'Failed to fetch users by role' });
  }
};

// GET - Mengambil program yang dibeli oleh user
exports.getMyPrograms = async (req, res) => {
  const db = global.db;
  const userId = req.user.user_id; // Dari token yang sudah di-decode oleh middleware

  try {
    const [rows] = await db.query(`
      SELECT 
        p.program_id,
        p.title,
        p.image_cover,
        e.status AS enrollment_status
      FROM enrollments e
      JOIN program p ON e.program_id = p.program_id
      WHERE e.user_id = ? AND e.status = 'active'
      ORDER BY e.created_at DESC
      LIMIT 3;
    `, [userId]);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("[ERROR] getMyPrograms:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil program user" });
  }
};
