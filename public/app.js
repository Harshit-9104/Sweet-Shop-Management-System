class SweetShopUI {
  constructor() {
    this.baseURL = "/api"
    this.currentTab = "inventory"
    this.transactionHistory = []
    this.init()
  }

  async init() {
    this.setupEventListeners()
    this.setupTabs()
    await this.loadInventory()
    await this.loadStats()
  }

  setupEventListeners() {
    // Tab navigation
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.switchTab(e.target.dataset.tab)
      })
    })

    // Add sweet form
    document.getElementById("addSweetForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.addSweet()
    })

    // Search functionality
    document.getElementById("searchBtn").addEventListener("click", () => {
      this.searchSweets()
    })

    document.getElementById("clearSearchBtn").addEventListener("click", () => {
      this.clearSearch()
    })

    // Sort functionality
    document.getElementById("sortBy").addEventListener("change", (e) => {
      this.sortSweets(e.target.value)
    })

    // Refresh button
    document.getElementById("refreshBtn").addEventListener("click", () => {
      this.loadInventory()
    })

    // Transaction buttons
    document.getElementById("purchaseBtn").addEventListener("click", () => {
      this.handleTransaction("purchase")
    })

    document.getElementById("restockBtn").addEventListener("click", () => {
      this.handleTransaction("restock")
    })
  }

  setupTabs() {
    const tabs = document.querySelectorAll(".tab-content")
    tabs.forEach((tab) => tab.classList.remove("active"))
    document.getElementById(this.currentTab).classList.add("active")
  }

  switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

    // Update active tab content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active")
    })
    document.getElementById(tabName).classList.add("active")

    this.currentTab = tabName

    // Load data for specific tabs
    if (tabName === "stats") {
      this.loadStats()
    }
  }

  showLoading() {
    document.getElementById("loading").classList.add("show")
  }

  hideLoading() {
    document.getElementById("loading").classList.remove("show")
  }

  showToast(message, type = "info") {
    const toast = document.getElementById("toast")
    toast.textContent = message
    toast.className = `toast ${type} show`

    setTimeout(() => {
      toast.classList.remove("show")
    }, 3000)
  }

  async apiCall(endpoint, options = {}) {
    try {
      this.showLoading()
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "API call failed")
      }

      return data
    } catch (error) {
      this.showToast(error.message, "error")
      throw error
    } finally {
      this.hideLoading()
    }
  }

  async loadInventory() {
    try {
      const response = await this.apiCall("/sweets")
      this.renderSweets(response.data, "sweetsList")
    } catch (error) {
      console.error("Failed to load inventory:", error)
    }
  }

  renderSweets(sweets, containerId) {
    const container = document.getElementById(containerId)

    if (sweets.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-candy-cane"></i>
                    <h3>No sweets found</h3>
                    <p>Add some sweets to get started!</p>
                </div>
            `
      return
    }

    container.innerHTML = sweets
      .map(
        (sweet) => `
            <div class="sweet-card">
                <div class="sweet-header">
                    <div class="sweet-name">${sweet.name}</div>
                    <div class="sweet-category">${sweet.category}</div>
                </div>
                <div class="sweet-details">
                    <div class="sweet-price">₹${sweet.price}</div>
                    <div class="sweet-quantity ${sweet.quantity < 20 ? "quantity-low" : ""}">
                        Stock: ${sweet.quantity} units
                        ${sweet.quantity < 20 ? '<i class="fas fa-exclamation-triangle"></i>' : ""}
                    </div>
                </div>
                <div class="sweet-actions">
                    <button class="btn btn-warning" onclick="sweetShopUI.quickPurchase(${sweet.id})">
                        <i class="fas fa-shopping-cart"></i> Buy
                    </button>
                    <button class="btn btn-success" onclick="sweetShopUI.quickRestock(${sweet.id})">
                        <i class="fas fa-plus"></i> Restock
                    </button>
                    <button class="btn btn-danger" onclick="sweetShopUI.deleteSweet(${sweet.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `,
      )
      .join("")
  }

  async addSweet() {
    try {
      const sweetData = {
        id: Number.parseInt(document.getElementById("sweetId").value),
        name: document.getElementById("sweetName").value,
        category: document.getElementById("sweetCategory").value,
        price: Number.parseFloat(document.getElementById("sweetPrice").value),
        quantity: Number.parseInt(document.getElementById("sweetQuantity").value),
      }

      await this.apiCall("/sweets", {
        method: "POST",
        body: JSON.stringify(sweetData),
      })

      this.showToast("Sweet added successfully!", "success")
      document.getElementById("addSweetForm").reset()
      await this.loadInventory()
      await this.loadStats()
    } catch (error) {
      console.error("Failed to add sweet:", error)
    }
  }

  async deleteSweet(id) {
    if (!confirm("Are you sure you want to delete this sweet?")) {
      return
    }

    try {
      await this.apiCall(`/sweets/${id}`, {
        method: "DELETE",
      })

      this.showToast("Sweet deleted successfully!", "success")
      await this.loadInventory()
      await this.loadStats()
    } catch (error) {
      console.error("Failed to delete sweet:", error)
    }
  }

  async searchSweets() {
    try {
      const params = new URLSearchParams()

      const name = document.getElementById("searchName").value
      const category = document.getElementById("searchCategory").value
      const minPrice = document.getElementById("minPrice").value
      const maxPrice = document.getElementById("maxPrice").value

      if (name) params.append("name", name)
      if (category) params.append("category", category)
      if (minPrice) params.append("minPrice", minPrice)
      if (maxPrice) params.append("maxPrice", maxPrice)

      const response = await this.apiCall(`/sweets/search?${params}`)
      this.renderSweets(response.data, "searchResults")

      if (response.data.length > 0) {
        this.showToast(`Found ${response.data.length} sweet(s)`, "success")
      } else {
        this.showToast("No sweets found matching your criteria", "info")
      }
    } catch (error) {
      console.error("Failed to search sweets:", error)
    }
  }

  clearSearch() {
    document.getElementById("searchName").value = ""
    document.getElementById("searchCategory").value = ""
    document.getElementById("minPrice").value = ""
    document.getElementById("maxPrice").value = ""
    document.getElementById("searchResults").innerHTML = ""
  }

  async sortSweets(field) {
    try {
      const response = await this.apiCall(`/sweets/sort/${field}`)
      this.renderSweets(response.data, "sweetsList")
      this.showToast(`Sorted by ${field}`, "info")
    } catch (error) {
      console.error("Failed to sort sweets:", error)
    }
  }

  async handleTransaction(type) {
    try {
      const id = Number.parseInt(document.getElementById("transactionId").value)
      const quantity = Number.parseInt(document.getElementById("transactionQuantity").value)

      if (!id || !quantity) {
        this.showToast("Please enter valid ID and quantity", "error")
        return
      }

      await this.apiCall(`/sweets/${id}/${type}`, {
        method: "POST",
        body: JSON.stringify({ quantity }),
      })

      const action = type === "purchase" ? "purchased" : "restocked"
      this.showToast(`Successfully ${action} ${quantity} units!`, "success")

      // Add to transaction history
      this.addTransactionToHistory(id, quantity, type)

      // Clear form
      document.getElementById("transactionId").value = ""
      document.getElementById("transactionQuantity").value = ""

      await this.loadInventory()
      await this.loadStats()
    } catch (error) {
      console.error(`Failed to ${type}:`, error)
    }
  }

  async quickPurchase(id) {
    const quantity = prompt("Enter quantity to purchase:")
    if (quantity && Number.parseInt(quantity) > 0) {
      try {
        await this.apiCall(`/sweets/${id}/purchase`, {
          method: "POST",
          body: JSON.stringify({ quantity: Number.parseInt(quantity) }),
        })

        this.showToast(`Successfully purchased ${quantity} units!`, "success")
        this.addTransactionToHistory(id, Number.parseInt(quantity), "purchase")
        await this.loadInventory()
        await this.loadStats()
      } catch (error) {
        console.error("Failed to purchase:", error)
      }
    }
  }

  async quickRestock(id) {
    const quantity = prompt("Enter quantity to restock:")
    if (quantity && Number.parseInt(quantity) > 0) {
      try {
        await this.apiCall(`/sweets/${id}/restock`, {
          method: "POST",
          body: JSON.stringify({ quantity: Number.parseInt(quantity) }),
        })

        this.showToast(`Successfully restocked ${quantity} units!`, "success")
        this.addTransactionToHistory(id, Number.parseInt(quantity), "restock")
        await this.loadInventory()
        await this.loadStats()
      } catch (error) {
        console.error("Failed to restock:", error)
      }
    }
  }

  addTransactionToHistory(id, quantity, type) {
    const transaction = {
      id,
      quantity,
      type,
      timestamp: new Date().toLocaleString(),
    }

    this.transactionHistory.unshift(transaction)
    this.transactionHistory = this.transactionHistory.slice(0, 10) // Keep only last 10

    this.renderTransactionHistory()
  }

  renderTransactionHistory() {
    const container = document.getElementById("transactionList")

    if (this.transactionHistory.length === 0) {
      container.innerHTML = "<p>No recent transactions</p>"
      return
    }

    container.innerHTML = this.transactionHistory
      .map(
        (transaction) => `
            <div class="transaction-item">
                <div>
                    <strong>${transaction.type.toUpperCase()}</strong> - Sweet ID: ${transaction.id}
                    <br>
                    Quantity: ${transaction.quantity} units
                </div>
                <div style="font-size: 0.9rem; color: #666;">
                    ${transaction.timestamp}
                </div>
            </div>
        `,
      )
      .join("")
  }

  async loadStats() {
    try {
      const response = await this.apiCall("/stats")
      const stats = response.data

      document.getElementById("totalValue").textContent = `₹${stats.totalValue}`
      document.getElementById("totalItems").textContent = stats.totalItems
      document.getElementById("lowStockCount").textContent = stats.lowStockItems.length

      this.renderLowStockItems(stats.lowStockItems)
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  renderLowStockItems(items) {
    const container = document.getElementById("lowStockItems")

    if (items.length === 0) {
      container.innerHTML = '<p style="color: #48bb78;">✅ All items are well stocked!</p>'
      return
    }

    container.innerHTML = items
      .map(
        (item) => `
            <div class="low-stock-item">
                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <span style="color: #666;">${item.category}</span>
                </div>
                <div style="color: #f56565; font-weight: bold;">
                    ${item.quantity} units left
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Initialize the application
const sweetShopUI = new SweetShopUI()
