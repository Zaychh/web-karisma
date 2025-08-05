// routes/tools.js
const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/toolsController');
const uploadTools = require('../middleware/uploadTools');

// === Route khusus (harus di atas route /:id) ===
router.get('/stats/usage', toolsController.getToolsStats);             // GET statistik tools

// === Route CRUD tools existing ===
router.get('/', toolsController.getAllTools);
router.get('/:id', toolsController.getToolById);
router.delete('/:id', toolsController.deleteTool);

// POST & PUT pakai upload
router.post('/', uploadTools.single('image'), toolsController.createTool);
router.put('/:id', uploadTools.single('image'), toolsController.updateTool);

// === Route tools baru ===
router.get('/:id/programs', toolsController.getToolPrograms);          // GET program yang pakai tool tertentu
router.delete('/:id/force', toolsController.forceDeleteTool);          // DELETE force (hapus beserta relasi)

module.exports = router;