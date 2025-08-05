const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Pastikan direktori uploads/achievements tersedia
const dir = path.join(__dirname, '..', 'uploads', 'achievements');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Konfigurasi storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/achievements');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
