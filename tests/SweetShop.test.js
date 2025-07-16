const SweetShop = require("../src/SweetShop")
const Sweet = require("../src/Sweet")

describe("Sweet Class", () => {
  test("should create a sweet with all properties", () => {
    const sweet = new Sweet(1001, "Kaju Katli", "Nut-Based", 50, 20)

    expect(sweet.id).toBe(1001)
    expect(sweet.name).toBe("Kaju Katli")
    expect(sweet.category).toBe("Nut-Based")
    expect(sweet.price).toBe(50)
    expect(sweet.quantity).toBe(20)
  })

  test("should throw error for invalid sweet data", () => {
    expect(() => new Sweet()).toThrow("Invalid sweet data")
    expect(() => new Sweet(1001, "", "category", 50, 20)).toThrow("Invalid sweet data")
    expect(() => new Sweet(1001, "name", "category", -50, 20)).toThrow("Invalid sweet data")
    expect(() => new Sweet(1001, "name", "category", 50, -20)).toThrow("Invalid sweet data")
  })
})

describe("SweetShop Management System", () => {
  let sweetShop

  beforeEach(() => {
    sweetShop = new SweetShop()
  })

  describe("addSweet functionality", () => {
    test("should add a new sweet successfully", () => {
      const sweetData = { id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 }
      const result = sweetShop.addSweet(sweetData)

      expect(result).toBe(true)
      expect(sweetShop.sweets.length).toBe(1)
      expect(sweetShop.sweets[0].name).toBe("Kaju Katli")
    })

    test("should throw error when adding sweet with duplicate ID", () => {
      const sweetData = { id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 }
      sweetShop.addSweet(sweetData)

      expect(() => sweetShop.addSweet(sweetData)).toThrow("Sweet with ID 1001 already exists")
    })

    test("should throw error for invalid sweet data", () => {
      expect(() => sweetShop.addSweet({})).toThrow("Invalid sweet data")
    })
  })

  describe("deleteSweet functionality", () => {
    beforeEach(() => {
      sweetShop.addSweet({ id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 })
      sweetShop.addSweet({ id: 1002, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 })
    })

    test("should delete sweet by ID successfully", () => {
      const result = sweetShop.deleteSweet(1001)

      expect(result).toBe(true)
      expect(sweetShop.sweets.length).toBe(1)
      expect(sweetShop.sweets[0].id).toBe(1002)
    })

    test("should throw error when deleting non-existent sweet", () => {
      expect(() => sweetShop.deleteSweet(9999)).toThrow("Sweet with ID 9999 not found")
    })
  })

  describe("viewSweets functionality", () => {
    test("should return empty array when no sweets exist", () => {
      const sweets = sweetShop.viewSweets()
      expect(sweets).toEqual([])
    })

    test("should return all sweets", () => {
      sweetShop.addSweet({ id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 })
      sweetShop.addSweet({ id: 1002, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 })

      const sweets = sweetShop.viewSweets()
      expect(sweets.length).toBe(2)
      expect(sweets[0].name).toBe("Kaju Katli")
      expect(sweets[1].name).toBe("Gajar Halwa")
    })
  })

  describe("searchSweets functionality", () => {
    beforeEach(() => {
      sweetShop.addSweet({ id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 })
      sweetShop.addSweet({ id: 1002, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 })
      sweetShop.addSweet({ id: 1003, name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 })
    })

    test("should search by name", () => {
      const results = sweetShop.searchSweets({ name: "Kaju" })
      expect(results.length).toBe(1)
      expect(results[0].name).toBe("Kaju Katli")
    })

    test("should search by category", () => {
      const results = sweetShop.searchSweets({ category: "Milk-Based" })
      expect(results.length).toBe(1)
      expect(results[0].name).toBe("Gulab Jamun")
    })

    test("should search by price range", () => {
      const results = sweetShop.searchSweets({ minPrice: 20, maxPrice: 40 })
      expect(results.length).toBe(1)
      expect(results[0].name).toBe("Gajar Halwa")
    })

    test("should return empty array for no matches", () => {
      const results = sweetShop.searchSweets({ name: "NonExistent" })
      expect(results).toEqual([])
    })
  })


  
})
