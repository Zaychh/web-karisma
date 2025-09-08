const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const programController = require("../controllers/programControl");
const sesiController = require("../controllers/sesiController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/cover");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const dir = path.join(__dirname, "..", "uploads", "cover");
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("✅ Directory 'uploads/cover' created successfully.");
}

const upload = multer({ storage });

// === Route untuk Program ===
router.post("/", upload.single("image_cover"), programController.createProgram);
router.get("/", programController.getAllPrograms);
router.get("/bootcamp", programController.getBootcampPrograms);
router.get("/freeclass", programController.getFreeClassPrograms);
router.get("/freeclass/:slug", programController.getFreeClassBySlug);
router.get("/categories", programController.getProgramCategories);
router.get("/:id/pricing", programController.getProgramPricing);
router.get("/:id/jobs", programController.getProgramJobs);
router.get("/:id/facts", programController.getProgramFacts);
router.get("/:id", programController.getProgramById);
router.put("/:id", upload.single("image_cover"), programController.updateProgram);
router.delete("/:id", programController.deleteProgram);

// === Route untuk Program-Tools ===
router.get("/:id/tools", programController.getProgramTools);           
router.post("/:id/tools", programController.addToolToProgram);         
router.delete("/:id/tools/:toolId", programController.removeToolFromProgram); 

// === Route untuk Program-Achievements (TAMBAHKAN INI SETELAH METHOD DITAMBAHKAN) ===
// UNCOMMENT SETELAH METHOD DITAMBAHKAN KE CONTROLLER:
router.get("/:id/achievements", programController.getProgramAchievements);           
router.post("/:id/achievements", programController.addAchievementToProgram);         
router.delete("/:id/achievements/:achievementId", programController.removeAchievementFromProgram); 

// === Route untuk Sesi ===
router.get("/:id/sesi", sesiController.getSesiByProgramId);
router.post("/:id/sesi", sesiController.createMultipleSessions);
router.get("/:programId/sesi/:sesiId", sesiController.getSesiById);
router.put("/:programId/sesi/:sesiId", sesiController.updateSesi);
router.delete("/:programId/sesi/:sesiId", sesiController.deleteSesi);

module.exports = router;