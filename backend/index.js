const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserResumeRoutes = require("./routes/UserResumeRoutes");

dotenv.config();

const app = express();

// CORS Configuration
const allowedOrigins = [
  "https://airesumebuilderforyou.netlify.app", 
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User resume routes
app.use("/api/userResume", UserResumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "AIResumeBuilder"
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
});
