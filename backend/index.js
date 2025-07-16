const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { createPool } = require('./database'); // Sekarang bisa destructure
const authRoutes = require('./routes/auth');
const instructorRoutes = require('./routes/instructor')
const programRoutes = require('./routes/program')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/program', programRoutes);
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server berjalan dengan baik!',
    database: global.db ? 'Connected' : 'Disconnected' 
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Menerima SIGTERM. Menutup server...');
  if (global.db) {
    await global.db.end();
    console.log('✅ Database connection ditutup');
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Menerima SIGINT. Menutup server...');
  if (global.db) {
    await global.db.end();
    console.log('✅ Database connection ditutup');
  }
  process.exit(0);
});

// Start server dengan database connection
const startServer = async () => {
  try {
    // Inisialisasi database connection pool
    console.log('🔄 Menginisialisasi database connection...');
    global.db = await createPool(); // Sekarang bisa await
    console.log('[DEBUG] db object:', global.db ? 'Connected' : 'undefined');
    
    // Start server setelah database terhubung
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Gagal start server:', error);
    process.exit(1);
  }
};

startServer();