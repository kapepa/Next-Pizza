import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useEffect } from "react"

interface FilterIngredientsProps {
  items: Ingredient[]
}

const useFilterIngredients = (): FilterIngredientsProps => {
  useEffect(() => {
    Api.ingredients.getAll
  }, [])

  return { items: [] }
}