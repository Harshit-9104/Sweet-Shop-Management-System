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

  
})
