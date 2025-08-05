const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'osamu28',
  database: process.env.DB_NAME || 'karismaacademy'
};

// Konfigurasi khusus untuk pool
const poolConfig = {
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Fungsi untuk membuat connection pool
const createPool = async () => {
  const pool = mysql.createPool(poolConfig);
  
  // Test koneksi
  for (let i = 1; i <= 30; i++) {
    try {
      console.log(`🔄 Testing pool connection (Attempt ${i}/30)...`);
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('✅ Pool connection berhasil!');
      return pool;
    } catch (error) {
      console.log(`❌ Attempt ${i}: Pool connection gagal - ${error.message}`);
      if (i === 30) {
        console.log('❌ Gagal membuat pool connection. Exit.');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

// Export function (bukan pool langsung)
module.exports = { createPool };