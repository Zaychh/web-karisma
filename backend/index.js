const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { createPool } = require('./database');
const authRoutes = require('./routes/auth');
const instructorRoutes = require('./routes/instructor');
const programRoutes = require('./routes/program');
const userRoutes = require('./routes/user'); // ✅ Ini tetap

const instructorRoutes = require('./routes/instructor')
const programRoutes = require('./routes/program')
const userRoutes = require('./routes/user');


const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// ✅ Middleware HARUS sebelum routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes setelah middleware
app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/user', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server berjalan dengan baik!',
    database: global.db ? 'Connected' : 'Disconnected' 
  });
});

const createDefaultAdmin = async () => {
  try {
    const [existingAdmin] = await global.db.execute(
      'SELECT user_id FROM users WHERE name = ? OR email = ?',
      ['Administrator', 'admin@mail.com']
    );

    if (existingAdmin.length === 0) {
      console.log('🔄 Creating default admin user...');
      
      const hashedPassword = await bcrypt.hash('adminn123', 10);
      
      await global.db.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Administrator', 'admin@mail.com', hashedPassword, 'admin']
      );

      console.log('✅ Default admin created successfully!');
      console.log('📝 Login credentials: Administrator / adminn123');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Menerima SIGTERM. Menutup server...');
  if (global.db) {
    await global.db.end();
    console.log('✅ Database Has Been Closed, Battle System Offline.');
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Menerima SIGINT. Menutup server...');
  if (global.db) {
    await global.db.end();
    console.log('✅ Database Has Been Closed, Battle System Offline.');
  }
  process.exit(0);
});

  // Tambahkan di startServer function setelah database terhubun

// Start server dengan database connection
const startServer = async () => {
  try {
    // Inisialisasi database connection pool
    console.log('🔄 Inializing Database Connection...Please Wait');
    global.db = await createPool();
    console.log('[DEBUG] db object:', global.db ? 'Connected' : 'undefined');
    
    // Sekarang panggil createDefaultAdmin (sudah didefinisikan di atas)
    await createDefaultAdmin();
    
    // Start server setelah database terhubung
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server already online, Master, System has been ready to use and connected in http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ ERROR, System Has been failed to start due unexpected error:', error);
    process.exit(1);
  }
  };

startServer();