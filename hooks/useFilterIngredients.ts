"use client"

import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"
import { useSet } from "react-use"

interface FilterIngredientsProps {
  onAddId: (key: string) => void,
  loading: boolean,
  selectedIngredients: Set<string>,
  ingredients: Ingredient[],
}

const useFilterIngredients = (tds?: string[]): FilterIngredientsProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    async function getIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    getIngredients();
  }, []);

  const setSelectedIngridients = (ids: string[]) => {
    ids.forEach(selectedIngredients.add)
  }

  return { onAddId: toggle, loading, selectedIngredients, ingredients };
}

export { useFilterIngredients }