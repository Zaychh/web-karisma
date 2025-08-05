const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const uploadAchievement = require('../middleware/uploadAchievement');

// ROUTES
router.get('/', achievementController.getAllAchievements);
router.get('/:id', achievementController.getAchievementById);
router.post('/', uploadAchievement.single('image'), achievementController.createAchievement);
router.put('/:id', uploadAchievement.single('image'), achievementController.updateAchievement);
router.delete('/:id', achievementController.deleteAchievement);
router.get('/:id/programs', achievementController.getAchievementPrograms);          // GET program yang pakai achievement tertentu
router.delete('/:id/force', achievementController.forceDeleteAchievement);

module.exports = router;
