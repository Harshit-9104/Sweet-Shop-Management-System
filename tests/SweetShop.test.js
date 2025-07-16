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


