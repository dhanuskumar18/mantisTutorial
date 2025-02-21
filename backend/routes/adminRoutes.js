const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/students", adminController.getStudents);
router.get("/students/:id", adminController.getStudentDetails);
router.put("/students/:id/status", adminController.updateStatus);

module.exports = router;
