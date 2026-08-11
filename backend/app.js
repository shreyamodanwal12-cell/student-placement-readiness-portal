const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const healthRoutes = require('./routes/healthRoutes')
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const errorHandler = require('./middleware/errorHandler')
const projectRoutes = require("./routes/projectRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const documentRoutes = require("./routes/documentRoutes");
dotenv.config()
const notificationRoutes = require("./routes/notificationRoutes");
const mockTestRoutes = require("./routes/mockTestRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', healthRoutes)
app.use("/api/companies", companyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/mock-tests", mockTestRoutes);
app.use("/api/resources", resourceRoutes);

app.use(errorHandler)

module.exports = app
