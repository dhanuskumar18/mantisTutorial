// controllers/studentController.js
const studentService = require("../services/studentService");
const studentValidator = require("../validators/studentValidator");
const path = require("path");
const knex = require("../config/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";
// Multer configuration for image upload
const multer = require("multer");
const { log } = require("console");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1000 * 1000,
  },
});
// Registration controller
const register = async (req, res) => {
  console.log(req.body);

  const {
    name,
    email,
    alternate_email,
    phone,
    alternate_phone,
    address,
    state,
    city,
    parent_name,
    job_name,
    salary,
  } = req.body;

  // Validate data using yup
  try {
    await studentValidator.validate(req.body, { abortEarly: false });

    // Handle image upload (Multer)
    if (req.file) {
      const imageUrl = `/uploads/images/${req.file.filename}`;
      console.log(imageUrl);
      // Save relative image URL
      const studentData = {
        name,
        email,
        alternate_email,
        phone,
        alternate_phone,
        address,
        state,
        city,
        image_url: imageUrl,
      };
      const parentData = { parent_name, job_name, salary };

      const existingStudent = await knex("student")
        .where({ email })
        .first();
      const existingStudent2 = await knex("student")
        .where({ alternate_email })
        .first();

      if (existingStudent) {
        return res
          .status(400)
          .json({ message: "Email is already registered", status: "error" });
      }
      if (existingStudent2) {
        return res
          .status(400)
          .json({ message: "Email is already registered", status: "error" });
      }
      // Register student and parent in the database
      const {
        student,
        parent,
      } = await studentService.registerStudentWithParent(
        studentData,
        parentData
      );

      return res.status(201).json({
        message: "Student and parent registered successfully",
        status: "success",
        data: { student, parent },
      });
    } else {
      return res
        .status(400)
        .json({ message: "Image file is required", status: "error" });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        status: "error",
        errors: error.errors,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};
//update
const updatedetail = async (req, res) => {
  try {
    console.log("hello hit");
    
    const {
      name,
      email,
      alternate_email,
      phone,
      alternate_phone,
      address,
      state,
      city,
      salary,
      parent_name,
      job_name,
    } = req.body;
    const id = parseInt(req.params.id);
    console.log(req.body);
    const student = {
      name,
      email,
      alternate_email,
      phone,
      alternate_phone,
      address,
      state,
      city,
    };
    const parent = { salary, parent_name, job_name };
    if (req.file) {
      console.log("file");
      
      student.image_url = `/uploads/images/${req.file.filename}`; 
    }
    if (!id || !student || !parent) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }
    const result = await studentService.updateStudentParent(
      id,
      student,
      parent
    );
    console.log("result");
    console.log(result);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: "error" });
  }
};
const getDetail = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    if(decoded.id)
    {
      const result = await studentService.getStudentDetails(decoded.id);
      console.log(result);
      return res.status(201).json(result);
    }
    const user={
name:"admin",
email:decoded.email
    }
    return res.status(201).json( {success: true, message: "Admin access granted",user,role:"admin"});
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { register, upload, updatedetail, getDetail };
