const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const cors=require("cors")
const path=require("path")
const app = express();
const port = 8000;
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json()); // To parse JSON data
app.use('/api/students', studentRoutes);
app.use('/api/auth',authRoutes );
app.use("/api", adminRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});