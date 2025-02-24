const knex = require("../config/db");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const otpStore = new Map();
const JWT_SECRET = "your_jwt_secret_key";
exports.sendOtp = async (email) => {
        const student = await knex("users").where({ email }).first();
        console.log(student);
        
        if (!student) {
            return { success: false, message: "Email not found" };
        }
        // const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otp = "111111";
        otpStore.set(email, otp);
        
        const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "dhanuskumar18@gmail.com",
            pass: "tric mgof otka yttf"
        }
    });
    
    await transporter.sendMail({
        from: "dhanuskumar18@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`
    });
    
    return { success: true, message: "OTP sent successfully" ,role:student.role};
}

exports.verifyOtp = async (email, otp) => {
    console.log(email);
    console.log(otp);
    const user = await knex("users").where({ email }).first();
        console.log(user);
    if (otpStore.get(email) === otp) {
        otpStore.delete(email);
        if(user.role == "admin"){
            return { success: true, message: "admin" };
        }
        else {
        const student = await knex("student").where({ email }).first();
        const parent= await knex('student').join('parent', 'student.id', '=', 'parent.student_id').where({ email }).select('*');
        console.log(parent);
        return { success: true,student,parent };}
    }
    return { success: false, message: "Invalid OTP" };
};
exports.generateToken = (student) => {
    return jwt.sign({ id: student.id, email: student.email }, JWT_SECRET, { expiresIn: "1h" });
};