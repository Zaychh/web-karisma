const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramCategories,
  insertTools,
  insertSesi,
  insertQuiz,
  insertJawaban,
  insertTugas
} = require('../controllers/programControl');

const router = express.Router();

// Setup multer dengan multiple destinations
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    
    // Tentukan folder berdasarkan fieldname
    if (file.fieldname === 'image_cover') {
      uploadPath = '../uploads/cover/';
    } else if (file.fieldname.includes('[image]')) {
      uploadPath = '../uploads/tools/';
    } else if (file.fieldname.includes('[video]')) {
      uploadPath = '../uploads/videos/';
    } else {
      uploadPath = '../uploads/misc/';
    }
    
    // Buat folder jika tidak ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const timestamp = Date.now();
    const fieldPrefix = file.fieldname.replace(/\[|\]/g, '_');
    cb(null, `${fieldPrefix}_${timestamp}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Filter berdasarkan fieldname
    if (file.fieldname === 'image_cover' || file.fieldname.includes('[image]')) {
      // Untuk image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Hanya file gambar yang diperbolehkan untuk field image!'), false);
      }
    } else if (file.fieldname.includes('[video]')) {
      // Untuk video files
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Hanya file video yang diperbolehkan untuk field video!'), false);
      }
    } else {
      // Allow other file types
      cb(null, true);
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
    files: 50 // max 50 files
  }
});

// Middleware untuk handle multer errors
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File terlalu besar! Maksimal 100MB per file.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Terlalu banyak file! Maksimal 50 file.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Field file tidak dikenal!' });
    }
  }
  
  if (error.message.includes('file')) {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
};

// ===== MAIN PROGRAM ROUTES =====
router.get('/categories', getProgramCategories);
router.get('/', getAllPrograms);
router.get('/:id', getProgramById);

// Gunakan upload.any() untuk menerima semua files dengan fieldname apa pun
router.post('/', upload.any(), handleMulterError, createProgram);
router.put('/:id', upload.any(), handleMulterError, updateProgram);
router.delete('/:id', deleteProgram);

// ===== INDIVIDUAL COMPONENT ROUTES =====
// Route untuk menambah tools ke program yang sudah ada
router.post('/:id/tools', upload.any(), handleMulterError, async (req, res) => {
  try {
    const programId = req.params.id;
    
    // Cek apakah program exists
    const [programRows] = await global.db.query("SELECT * FROM program WHERE program_id = ?", [programId]);
    if (programRows.length === 0) {
      return res.status(404).json({ error: 'Program tidak ditemukan' });
    }
    
    // Extract tools data (sama seperti di createProgram)
    const tools = [];
    const toolImages = req.files?.filter(f => f.fieldname.includes('tools[') && f.fieldname.includes('[image]')) || [];
    
    // Parse tools data from req.body
    Object.keys(req.body).forEach(key => {
      const toolMatch = key.match(/tools\[(\d+)\]\[(.+)\]/);
      if (toolMatch) {
        const [, index, field] = toolMatch;
        const toolIndex = parseInt(index);
        
        if (!tools[toolIndex]) {
          tools[toolIndex] = {};
        }
        
        tools[toolIndex][field] = req.body[key];
      }
    });
    
    // Add image files to tools
    toolImages.forEach(file => {
      const indexMatch = file.fieldname.match(/tools\[(\d+)\]/);
      if (indexMatch) {
        const toolIndex = parseInt(indexMatch[1]);
        if (tools[toolIndex]) {
          tools[toolIndex].image = file.filename;
        }
      }
    });
    
    // Insert tools using handler function
    const insertedTools = await insertTools(tools, programId);
    
    res.status(201).json({
      message: 'Tools berhasil ditambahkan',
      data: insertedTools
    });
    
  } catch (err) {
    console.error("❌ Add tools error:", err);
    res.status(500).json({ error: 'Gagal menambahkan tools', details: err.message });
  }
});

// Route untuk menambah sesi ke program yang sudah ada
router.post('/:id/sesi', upload.any(), handleMulterError, async (req, res) => {
  try {
    const programId = req.params.id;
    
    // Cek apakah program exists
    const [programRows] = await global.db.query("SELECT * FROM program WHERE program_id = ?", [programId]);
    if (programRows.length === 0) {
      return res.status(404).json({ error: 'Program tidak ditemukan' });
    }
    
    // Extract sesi data (sama seperti di createProgram)
    const sesi = [];
    const videoFiles = req.files?.filter(f => f.fieldname.includes('sesi[') && f.fieldname.includes('[video]')) || [];
    
    // Parse sesi data from req.body
    Object.keys(req.body).forEach(key => {
      const sesiMatch = key.match(/sesi\[(\d+)\]\[(.+)\]/);
      if (sesiMatch) {
        const [, index, field] = sesiMatch;
        const sesiIndex = parseInt(index);
        
        if (!sesi[sesiIndex]) {
          sesi[sesiIndex] = {
            quiz: { jawaban: [] },
            tugas: {}
          };
        }
        
        // Handle nested fields (quiz, tugas)
        if (field.includes('quiz')) {
          const quizMatch = field.match(/quiz\]\[(.+)\]/);
          if (quizMatch) {
            const quizField = quizMatch[1];
            if (quizField.includes('jawaban')) {
              const answerMatch = quizField.match(/jawaban\]\[(\d+)\]/);
              if (answerMatch) {
                const answerIndex = parseInt(answerMatch[1]);
                sesi[sesiIndex].quiz.jawaban[answerIndex] = req.body[key];
              }
            } else {
              sesi[sesiIndex].quiz[quizField] = req.body[key];
            }
          }
        } else if (field.includes('tugas')) {
          const tugasMatch = field.match(/tugas\]\[(.+)\]/);
          if (tugasMatch) {
            sesi[sesiIndex].tugas[tugasMatch[1]] = req.body[key];
          }
        } else {
          sesi[sesiIndex][field] = req.body[key];
        }
      }
    });
    
    // Add video files to sesi
    videoFiles.forEach(file => {
      const indexMatch = file.fieldname.match(/sesi\[(\d+)\]/);
      if (indexMatch) {
        const sesiIndex = parseInt(indexMatch[1]);
        if (sesi[sesiIndex]) {
          sesi[sesiIndex].video = file.filename;
        }
      }
    });
    
    // Insert sesi using handler function
    const insertedSesi = await insertSesi(sesi, programId);
    
    res.status(201).json({
      message: 'Sesi berhasil ditambahkan',
      data: insertedSesi
    });
    
  } catch (err) {
    console.error("❌ Add sesi error:", err);
    res.status(500).json({ error: 'Gagal menambahkan sesi', details: err.message });
  }
});

// Route untuk menambah quiz ke sesi yang sudah ada
router.post('/sesi/:sesiId/quiz', async (req, res) => {
  try {
    const sesiId = req.params.sesiId;
    const { soal, jawaban, benar } = req.body;
    
    // Cek apakah sesi exists
    const [sesiRows] = await global.db.query("SELECT * FROM sesi WHERE id = ?", [sesiId]);
    if (sesiRows.length === 0) {
      return res.status(404).json({ error: 'Sesi tidak ditemukan' });
    }
    
    // Insert quiz using handler function
    const quizData = await insertQuiz({ soal, jawaban, benar }, sesiId);
    
    res.status(201).json({
      message: 'Quiz berhasil ditambahkan',
      data: quizData
    });
    
  } catch (err) {
    console.error("❌ Add quiz error:", err);
    res.status(500).json({ error: 'Gagal menambahkan quiz', details: err.message });
  }
});

// Route untuk menambah tugas ke sesi yang sudah ada
router.post('/sesi/:sesiId/tugas', async (req, res) => {
  try {
    const sesiId = req.params.sesiId;
    const { soal_tugas } = req.body;
    
    // Cek apakah sesi exists
    const [sesiRows] = await global.db.query("SELECT * FROM sesi WHERE id = ?", [sesiId]);
    if (sesiRows.length === 0) {
      return res.status(404).json({ error: 'Sesi tidak ditemukan' });
    }
    
    // Insert tugas using handler function
    const tugasData = await insertTugas({ soal_tugas }, sesiId);
    
    res.status(201).json({
      message: 'Tugas berhasil ditambahkan',
      data: tugasData
    });
    
  } catch (err) {
    console.error("❌ Add tugas error:", err);
    res.status(500).json({ error: 'Gagal menambahkan tugas', details: err.message });
  }
});

// ===== UTILITY ROUTES =====
// Route untuk mendapatkan detail program dengan semua relasi
router.get('/:id/full', async (req, res) => {
  try {
    const programId = req.params.id;
    
    // Get program data
    const [programRows] = await global.db.query("SELECT * FROM program WHERE program_id = ?", [programId]);
    if (programRows.length === 0) {
      return res.status(404).json({ error: 'Program tidak ditemukan' });
    }
    
    // Get tools
    const [toolsRows] = await global.db.query("SELECT * FROM tools WHERE id_program = ?", [programId]);
    
    // Get sesi with related data
    const [sesiRows] = await global.db.query("SELECT * FROM sesi WHERE id_program = ?", [programId]);
    
    const sesiWithDetails = await Promise.all(sesiRows.map(async (sesi) => {
      // Get quiz for this sesi
      const [quizRows] = await global.db.query("SELECT * FROM soal WHERE id_sesi = ?", [sesi.id]);
      
      // Get jawaban for each quiz
      const quizWithJawaban = await Promise.all(quizRows.map(async (quiz) => {
        const [jawabanRows] = await global.db.query("SELECT * FROM jawaban WHERE id_soal = ?", [quiz.id]);
        return {
          ...quiz,
          jawaban: jawabanRows
        };
      }));
      
      // Get tugas for this sesi
      const [tugasRows] = await global.db.query("SELECT * FROM tugas WHERE id_sesi = ?", [sesi.id]);
      
      return {
        ...sesi,
        quiz: quizWithJawaban,
        tugas: tugasRows
      };
    }));
    
    res.json({
      program: programRows[0],
      tools: toolsRows,
      sesi: sesiWithDetails
    });
    
  } catch (err) {
    console.error("❌ Get full program error:", err);
    res.status(500).json({ error: 'Gagal mengambil data program lengkap', details: err.message });
  }
});

module.exports = router;