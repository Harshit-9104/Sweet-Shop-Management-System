const SweetShop = require("./SweetShop")

// Sample data for demonstration
const sampleSweets = [
  { id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 },
  { id: 1002, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 },
  { id: 1003, name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 },
  { id: 1004, name: "Rasgulla", category: "Milk-Based", price: 15, quantity: 30 },
  { id: 1005, name: "Jalebi", category: "Syrup-Based", price: 25, quantity: 25 },
]

function demonstrateSystem() {
  console.log("🍬 Sweet Shop Management System Demo\n")

  // Initialize sweet shop
  const sweetShop = new SweetShop()

  // Add sample sweets
  console.log("📦 Adding sample sweets...")
  sampleSweets.forEach((sweet) => {
    try {
      sweetShop.addSweet(sweet)
      console.log(`✅ Added: ${sweet.name}`)
    } catch (error) {
      console.log(`❌ Error adding ${sweet.name}: ${error.message}`)
    }
  })

  console.log("\n📋 Current Inventory:")
  sweetShop.viewSweets().forEach((sweet) => {
    console.log(`- ${sweet.name} (${sweet.category}) - ₹${sweet.price} x ${sweet.quantity}`)
  })

  // Demonstrate search functionality
  console.log("\n🔍 Search Results:")
  console.log('Searching for "Milk-Based" sweets:')
  const milkBasedSweets = sweetShop.searchSweets({ category: "Milk-Based" })
  milkBasedSweets.forEach((sweet) => {
    console.log(`- ${sweet.name} - ₹${sweet.price}`)
  })

  // Demonstrate sorting
  console.log("\n📊 Sorted by Price (Low to High):")
  const sortedByPrice = sweetShop.sortSweets("price")
  sortedByPrice.forEach((sweet) => {
    console.log(`- ${sweet.name} - ₹${sweet.price}`)
  })

  // Demonstrate purchase
  console.log("\n💰 Purchase Transaction:")
  try {
    sweetShop.purchaseSweet(1001, 5)
    console.log("✅ Purchased 5 units of Kaju Katli")
    const updatedSweet = sweetShop.getSweetById(1001)
    console.log(`Updated stock: ${updatedSweet.quantity} units`)
  } catch (error) {
    console.log(`❌ Purchase failed: ${error.message}`)
  }

  // Demonstrate restock
  console.log("\n📈 Restock Transaction:")
  try {
    sweetShop.restockSweet(1002, 10)
    console.log("✅ Restocked 10 units of Gajar Halwa")
    const updatedSweet = sweetShop.getSweetById(1002)
    console.log(`Updated stock: ${updatedSweet.quantity} units`)
  } catch (error) {
    console.log(`❌ Restock failed: ${error.message}`)
  }

  // Show inventory statistics
  console.log("\n📊 Inventory Statistics:")
  console.log(`Total Inventory Value: ₹${sweetShop.getTotalInventoryValue()}`)
  console.log(`Total Items: ${sweetShop.viewSweets().length}`)

  const lowStockItems = sweetShop.getLowStockItems(20)
  if (lowStockItems.length > 0) {
    console.log("\n⚠️ Low Stock Alert:")
    lowStockItems.forEach((sweet) => {
      console.log(`- ${sweet.name}: ${sweet.quantity} units remaining`)
    })
  }
}

// Run demonstration if this file is executed directly
if (require.main === module) {
  demonstrateSystem()
}

module.exports = { SweetShop, demonstrateSystem }
