import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

const useIngredients = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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

  return { loading, ingredients }
}

export { useIngredients };