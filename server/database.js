const mysql = require('mysql2');

// Konfigurasi koneksi pakai environment variable
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'karismaacademy',
  port: process.env.DB_PORT || 3306,
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error('❌ Koneksi ke MySQL gagal:', err.message);
  } else {
    console.log('✅ Terkoneksi ke MySQL Database');
  }
});

module.exports = db;
