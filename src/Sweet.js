class Sweet {
  constructor(id, name, category, price, quantity) {
    // Validate input data
    if (!id || !name || !category || price < 0 || quantity < 0) {
      throw new Error("Invalid sweet data")
    }

    this.id = id
    this.name = name
    this.category = category
    this.price = price
    this.quantity = quantity
  }

  // Method to get sweet info as string
  toString() {
    return `ID: ${this.id}, Name: ${this.name}, Category: ${this.category}, Price: ₹${this.price}, Quantity: ${this.quantity}`
  }

  // Method to check if sweet is in stock
  isInStock() {
    return this.quantity > 0
  }

  // Method to get sweet as plain object
  toObject() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
    }
  }
}

module.exports = Sweet
