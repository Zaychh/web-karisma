const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorControl');
const upload = require('../middleware/upload');

// CRUD
router.get('/', instructorController.getInstructors);
router.get('/mastery', instructorController.getMasteryEnum);
router.get('/:id', instructorController.getInstructorById);
router.post('/', upload.single('image'), instructorController.createInstructor);
router.put('/:id', upload.single('image'), instructorController.updateInstructor);
router.delete('/:id', instructorController.deleteInstructor);

module.exports = router;
