// routes/studentRoutes.js
const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

// Route for registering a student and parent
router.get("/me",studentController.getDetail)
router.post('/register', studentController.upload.single('image'), studentController.register);
router.put("/:id",studentController.upload.single('image'),studentController.updatedetail)

module.exports = router;
