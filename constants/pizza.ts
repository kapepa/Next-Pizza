"use client"

const mapPizzaSize = {
  20: "Small",
  30: "Middle",
  40: "Large",
} as const;

const mapPizzaType = {
  1: "Traditional",
  2: "Thin",
} as const;

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;

const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({ name, value }))
const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({ name, value }))

export { mapPizzaSize, mapPizzaType, pizzaSizes, pizzaTypes }