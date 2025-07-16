const Sweet = require("./Sweet")

class SweetShop {
  constructor() {
    this.sweets = []
  }

  // Add a new sweet to the shop
  addSweet(sweetData) {
    try {
      // Check if sweet with same ID already exists
      const existingSweet = this.sweets.find((sweet) => sweet.id === sweetData.id)
      if (existingSweet) {
        throw new Error(`Sweet with ID ${sweetData.id} already exists`)
      }

      // Create new sweet instance
      const sweet = new Sweet(sweetData.id, sweetData.name, sweetData.category, sweetData.price, sweetData.quantity)

      this.sweets.push(sweet)
      return true
    } catch (error) {
      throw error
    }
  }

  // Delete sweet by ID
  deleteSweet(id) {
    const index = this.sweets.findIndex((sweet) => sweet.id === id)
    if (index === -1) {
      throw new Error(`Sweet with ID ${id} not found`)
    }

    this.sweets.splice(index, 1)
    return true
  }

  // View all sweets
  viewSweets() {
    return this.sweets.map((sweet) => sweet.toObject())
  }

  // Search sweets by criteria
  searchSweets(criteria) {
    return this.sweets
      .filter((sweet) => {
        // Search by name (case-insensitive partial match)
        if (criteria.name) {
          return sweet.name.toLowerCase().includes(criteria.name.toLowerCase())
        }

        // Search by category (case-insensitive exact match)
        if (criteria.category) {
          return sweet.category.toLowerCase() === criteria.category.toLowerCase()
        }

        // Search by price range
        if (criteria.minPrice !== undefined || criteria.maxPrice !== undefined) {
          const minPrice = criteria.minPrice || 0
          const maxPrice = criteria.maxPrice || Number.POSITIVE_INFINITY
          return sweet.price >= minPrice && sweet.price <= maxPrice
        }

        return false
      })
      .map((sweet) => sweet.toObject())
  }

  // Sort sweets by field
  sortSweets(byField) {
    const validFields = ["name", "price", "quantity", "category"]
    if (!validFields.includes(byField)) {
      throw new Error("Invalid sort field")
    }

    const sortedSweets = [...this.sweets].sort((a, b) => {
      if (byField === "name" || byField === "category") {
        return a[byField].localeCompare(b[byField])
      } else {
        return a[byField] - b[byField]
      }
    })

    return sortedSweets.map((sweet) => sweet.toObject())
  }

  // Purchase sweet (reduce stock)
  purchaseSweet(id, quantity) {
    if (quantity <= 0) {
      throw new Error("Invalid quantity")
    }

    const sweet = this.sweets.find((sweet) => sweet.id === id)
    if (!sweet) {
      throw new Error(`Sweet with ID ${id} not found`)
    }

    if (sweet.quantity < quantity) {
      throw new Error(`Insufficient quantity. Available: ${sweet.quantity}, Requested: ${quantity}`)
    }

    sweet.quantity -= quantity
    return true
  }

  // Restock sweet (increase stock)
  restockSweet(id, quantity) {
    if (quantity <= 0) {
      throw new Error("Invalid quantity")
    }

    const sweet = this.sweets.find((sweet) => sweet.id === id)
    if (!sweet) {
      throw new Error(`Sweet with ID ${id} not found`)
    }

    sweet.quantity += quantity
    return true
  }

  // Get sweet by ID
  getSweetById(id) {
    const sweet = this.sweets.find((sweet) => sweet.id === id)
    return sweet ? sweet.toObject() : null
  }

  // Get total inventory value
  getTotalInventoryValue() {
    return this.sweets.reduce((total, sweet) => {
      return total + sweet.price * sweet.quantity
    }, 0)
  }

  // Get low stock items (quantity < threshold)
  getLowStockItems(threshold = 10) {
    return this.sweets.filter((sweet) => sweet.quantity < threshold).map((sweet) => sweet.toObject())
  }
}

module.exports = SweetShop
