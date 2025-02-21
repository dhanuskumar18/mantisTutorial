const Student = require("../models/studentModel");

const getStudents = async (req, res) => {
  try {
    console.log("hit");
    const students = await Student.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const student = await Student.getStudentById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student details" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    await Student.updateStudentStatus(id, active);
    res.json({ message: "Student status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

module.exports = {
  getStudents,
  getStudentDetails,
  updateStatus,
};
