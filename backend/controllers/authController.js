const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";
const authService = require("../services/authService");

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.sendOtp(email);
        console.log(result);
        if(result.success)
        {
            res.json(result);

        }
        else 
        {
            res.status(500).json({ success: false, message: "Email not found" });

        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending OTP" });
    }
};

exports.verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;
        const result = await authService.verifyOtp(email, otp);
        console.log("result",result.message);
        if(result.message == "admin")
        {
            console.log("mmm");
            const payload={email:"hackermdk@gmail.com"}
           const serviceToken=  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
           console.log(serviceToken);
           const user={name:"admin",
            email:email
           }
            res.json({ success: true,role:"admin",serviceToken ,user});
        }
         else if (result.success) {
            const serviceToken = authService.generateToken(result.student);
            console.log(serviceToken);
            
            res.json({ success: true,user:result.parent, serviceToken ,role:"student"});
        } else {
            res.json(result);
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: "Error verifying OTP" });
    }
};