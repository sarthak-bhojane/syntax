#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2] || "express-app";
const root = path.join(process.cwd(), projectName);

try {
  // Create folders
  fs.mkdirSync(root, { recursive: true });
  fs.mkdirSync(path.join(root, "src/routes"), { recursive: true });
  fs.mkdirSync(path.join(root, "src/controllers"), { recursive: true });

  // Write app.js
  fs.writeFileSync(
    path.join(root, "src/app.js"),
`const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
`
  );


  // Initialize npm & install express
  console.log("📦 Initializing npm...");
  execSync("npm init -y", { cwd: root, stdio: "inherit" });

  console.log("📦 Installing express...");
  execSync("npm install express", { cwd: root, stdio: "inherit" });

  console.log("✅ Express structure created successfully!");
} catch (error) {
  console.error("❌ Error creating Express app:", error.message);
}
