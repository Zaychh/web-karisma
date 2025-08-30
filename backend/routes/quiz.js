const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyToken } = require('../middleware/authMiddleware'); // ✅ import middleware

// Debug middleware untuk log semua request
router.use((req, res, next) => {
    console.log(`📥 Quiz Route: ${req.method} ${req.originalUrl}`);
    console.log('📄 Body:', req.body);
    console.log('📋 Params:', req.params);
    next();
});

// Admin routes
router.get('/admin/quiz', quizController.getAllQuizzes);
router.get('/admin/quiz/:id', quizController.getQuizById);
router.post('/admin/quiz', quizController.createQuiz);
router.put('/admin/quiz/:id', quizController.updateQuiz);
router.delete('/admin/quiz/:id', quizController.deleteQuiz);

// Endpoint baru untuk siswa
router.get('/siswa/sesi/:sesi_id/quiz', quizController.getQuizForSiswaBySesi);

// Student routes
router.get('/quiz/:id', quizController.getQuizForStudent);

// ⬇️ tambahin verifyToken di sini
router.post('/submit', verifyToken, quizController.submitQuizBySesi);

// Get quizzes by program or sesi
router.get('/program/:program_id/quiz', quizController.getQuizzesByProgram);
router.get('/sesi/:sesi_id/quiz', quizController.getQuizzesBySesi);
router.get('/sesi/:sesi_id/quiz/check', verifyToken, quizController.checkSesiQuiz);

// Endpoint sesi by program
router.get('/program/:program_id/sesi', async (req, res) => {
    try {
        console.log('🔍 Getting sesi for program:', req.params.program_id);
        const { program_id } = req.params;

        if (!global.db) {
            return res.status(500).json({
                success: false,
                message: 'Database connection error'
            });
        }

        const [sesi] = await global.db.execute(
            'SELECT * FROM sesi WHERE id_program = ? ORDER BY id', 
            [program_id]
        );

        console.log('✅ Found sesi:', sesi.length);

        res.status(200).json({
            success: true,
            data: sesi
        });
    } catch (error) {
        console.error('❌ Error getting sesi by program:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting sesi: ' + error.message
        });
    }
});

// Health check
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Quiz routes working',
        database: global.db ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
