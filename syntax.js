#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2] || "express-app";
const root = path.join(process.cwd(), projectName);

const writeFile = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
};

try {
  fs.mkdirSync(root, { recursive: true });

  // ================= DB =================
  writeFile(
    path.join(root, "src/config/db.js"),
`
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
`
  );

  // ================= CONTROLLER =================
  writeFile(
    path.join(root, "src/controllers/user.controller.js"),
`
const { register, login } = require("../services/user.service.js");

const registerUser = async (req, res) => {
  try {
    const data = req.method === "GET" ? req.query : req.body;
    const user = await register(data);
    return res.status(201).json({
      message: "User Registered Successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.method === "GET" ? req.query : req.body;
    const user = await login(data);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Login Successful",
      user
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
`
  );

  // ================= MIDDLEWARE =================
  writeFile(
    path.join(root, "src/middleware/auth.middleware.js"),
`
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = { id: "123", name: "Sarthak" };
  next();
};

module.exports = authMiddleware;
`
  );

  // ================= MODEL =================
  writeFile(
    path.join(root, "src/models/user.model.js"),
`
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
`
  );

  // ================= SERVICE =================
  writeFile(
    path.join(root, "src/services/user.service.js"),
`
const User = require("../models/user.model.js");

const register = async (data) => {
  const user = await User.create(data);
  return user;
};

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  return user;
};

module.exports = { register, login };
`
  );

  // ================= ROUTES =================
  writeFile(
    path.join(root, "src/routes/user.routes.js"),
`
const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

// Support BOTH GET & POST
router.route("/register")
  .get(registerUser)
  .post(registerUser);

router.route("/login")
  .get(loginUser)
  .post(loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile Accessed", user: req.user });
});

module.exports = router;
`
  );

  // ================= APP =================
  writeFile(
    path.join(root, "src/app.js"),
`
const express = require("express");
const userRoutes = require("./routes/user.routes.js");
const connectDB = require("./config/db.js");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.use("/api/users", userRoutes);

module.exports = app;
`
  );

  // ================= SERVER =================
  writeFile(
    path.join(root, "src/server.js"),
`
const app = require("./app.js");

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
`
  );

  console.log("📦 Initializing npm...");
  execSync("npm init -y", { cwd: root, stdio: "inherit" });

  console.log("📦 Installing dependencies...");
  execSync("npm install express mongoose", { cwd: root, stdio: "inherit" });

  console.log("✅ Express structure created successfully!");
} catch (error) {
  console.error("❌ Error creating Express app:", error.message);
}