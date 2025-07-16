const express = require('express');
const { 
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramCategories
} = require('../controllers/programControl');
const router = express.Router();

router.get('/categories', getProgramCategories);
router.get('/', getAllPrograms);
router.get('/:id', getProgramById);
router.post('/', createProgram);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

module.exports = router;