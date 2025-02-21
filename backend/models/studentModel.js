// models/studentModel.js
const knex = require("../config/db");

const createStudent = async (studentData) => {
  try {
    console.log("mmm");
    
    await knex("users")
      .insert({ email: studentData.email, role: "student" })
      .then(() => console.log("Inserted successfully"))
      .catch((err) => console.error("Error inserting:", err));
    console.log(studentData);
    const result = await knex("student")
      .insert(studentData)
      .returning("*");
    console.log(result);
    return result[0]; // Returning the inserted student
  } catch (error) {
    console.error("Error inserting student:", error.message);
    throw error;
  }
};

const createParent = async (parentData) => {
  try {
    console.log(parentData);

    const result = await knex("parent")
      .insert(parentData)
      .returning("*");
    return result[0]; // Returning the inserted parent
  } catch (error) {
    console.error("Error inserting student:", error.message);

    throw error;
  }
};
const getAllStudents = async () => {
  try {
    const result = await knex("student").select("*");
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error.message);

    throw error;
  }
};

const getStudentById = async (id) => {
  try {
    // const res = await knex("student")
    //   .where({ id })
    //   .first();
    // const res= await knex('student').join('parent', 'student.id', '=', 'parent.student_id').where({ id }).select('*');
    const res = await knex("student")
      .select("student.*", "parent.*") // Select all columns from both tables
      .leftJoin("parent", "student.id", "parent.student_id") // Join using student ID
      .where("student.id", id)
      .first(); // Fet
    return res;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
const updateStudentStatus = async (id, active) => {
  try {
    await knex("student")
      .where({ id })
      .update({ active });
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

module.exports = {
  createStudent,
  createParent,
  getAllStudents,
  getStudentById,
  updateStudentStatus,
};
