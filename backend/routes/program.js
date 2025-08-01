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
router.get("/categories", programController.getProgramCategories);
router.get("/:id", programController.getProgramById);
router.put("/:id", upload.single("image_cover"), programController.updateProgram);
router.delete("/:id", programController.deleteProgram);

router.get("/:id/sesi", sesiController.getSesiByProgramId);
router.post("/:id/sesi", sesiController.createMultipleSessions);

module.exports = router;
