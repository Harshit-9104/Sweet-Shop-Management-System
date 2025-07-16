#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

console.log("🍬 Setting up Sweet Shop Management System...\n")

// Check if required directories exist
const requiredDirs = ["src", "tests", "public", "scripts"]
const requiredFiles = [
  "src/Sweet.js",
  "src/SweetShop.js",
  "tests/SweetShop.test.js",
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "server.js",
]

console.log("📁 Checking project structure...")
requiredDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/ directory exists`)
  } else {
    console.log(`❌ ${dir}/ directory missing`)
  }
})

console.log("\n📄 Checking required files...")
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`)
  } else {
    console.log(`❌ ${file} missing`)
  }
})

console.log("\n🎯 Next steps:")
console.log("1. Run: npm install")
console.log("2. Run: npm test (to verify TDD implementation)")
console.log("3. Run: npm run serve (to start web server)")
console.log("4. Open: http://localhost:3000 (to access web interface)")
console.log("\n🚀 Happy coding!")
