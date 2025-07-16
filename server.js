const express = require("express")
const cors = require("cors")
const path = require("path")
const SweetShop = require("./src/SweetShop")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

// Initialize sweet shop with sample data
const sweetShop = new SweetShop()

// Sample data
const sampleSweets = [
  { id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 },
  { id: 1002, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 },
  { id: 1003, name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 },
  { id: 1004, name: "Rasgulla", category: "Milk-Based", price: 15, quantity: 30 },
  { id: 1005, name: "Jalebi", category: "Syrup-Based", price: 25, quantity: 25 },
]

// Initialize with sample data
sampleSweets.forEach((sweet) => {
  try {
    sweetShop.addSweet(sweet)
  } catch (error) {
    console.log(`Error adding sample sweet: ${error.message}`)
  }
})

// API Routes
app.get("/api/sweets", (req, res) => {
  try {
    const sweets = sweetShop.viewSweets()
    res.json({ success: true, data: sweets })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/api/sweets", (req, res) => {
  try {
    sweetShop.addSweet(req.body)
    res.json({ success: true, message: "Sweet added successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.delete("/api/sweets/:id", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    sweetShop.deleteSweet(id)
    res.json({ success: true, message: "Sweet deleted successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.get("/api/sweets/search", (req, res) => {
  try {
    const criteria = {}
    if (req.query.name) criteria.name = req.query.name
    if (req.query.category) criteria.category = req.query.category
    if (req.query.minPrice) criteria.minPrice = Number.parseFloat(req.query.minPrice)
    if (req.query.maxPrice) criteria.maxPrice = Number.parseFloat(req.query.maxPrice)

    const results = sweetShop.searchSweets(criteria)
    res.json({ success: true, data: results })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.get("/api/sweets/sort/:field", (req, res) => {
  try {
    const sortedSweets = sweetShop.sortSweets(req.params.field)
    res.json({ success: true, data: sortedSweets })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.post("/api/sweets/:id/purchase", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    const quantity = Number.parseInt(req.body.quantity)
    sweetShop.purchaseSweet(id, quantity)
    res.json({ success: true, message: "Purchase completed successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.post("/api/sweets/:id/restock", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    const quantity = Number.parseInt(req.body.quantity)
    sweetShop.restockSweet(id, quantity)
    res.json({ success: true, message: "Restock completed successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.get("/api/stats", (req, res) => {
  try {
    const stats = {
      totalValue: sweetShop.getTotalInventoryValue(),
      totalItems: sweetShop.viewSweets().length,
      lowStockItems: sweetShop.getLowStockItems(20),
    }
    res.json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
  console.log(`🍬 Sweet Shop Management System running on http://localhost:${PORT}`)
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`)
  console.log(`🌐 Web interface available at http://localhost:${PORT}`)
})

module.exports = app
