// services/studentService.js
const knex=require("../config/db")
const { createStudent, createParent } = require('../models/studentModel');

const registerStudentWithParent = async (studentData, parentData) => {
  try {
    console.log("hello")
    // Insert student first
    const student = await createStudent(studentData);
    console.log(student);
    // Prepare the parent data with the student_id
    const parentWithStudentId = { ...parentData, student_id: student.id };
    
    // Insert parent data
    const parent = await createParent(parentWithStudentId);
    console.log(parent)
    
    return { student, parent };
  } catch (error) {
    throw error;
  }
};
const updateStudentParent = async (id, studentData, parentData) => {
  
  try {
    console.log(id);
    console.log(studentData);
    console.log(parentData);
    
    // Update student details
    await knex("student").where({ id }).update(studentData);

    // Update parent details
    await knex("parent").where({ student_id: id }).update(parentData);
    // const updated= await knex('student').join('parent', 'student.id', '=', 'parent.student_id').where({ id }).select('*');
    const updatedData = await knex("student").join("parent", "student.id", "parent.student_id").select("*").where("student.id", id).first();
console.log(updatedData);
console.log("updated");

    return { success: true, message: "Student and parent details updated successfully",details:updatedData};
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStudentDetails=async (id)=>{
  try {
    const res = await knex("student").join("parent", "student.id", "parent.student_id").select("*").where("student.id", id).first();
   console.log(res);
   return { success: true, message: "Student details fetched successfully",user:res};
   
    
  } catch (error) {
    throw new Error(error.message);
    
  }
}

module.exports = { registerStudentWithParent,updateStudentParent,getStudentDetails };
