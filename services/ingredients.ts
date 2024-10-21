import { Ingredient } from "@prisma/client";
import { instance } from "./instance";
import { ApiRoutes } from "./constants";

const getAll = async (query?: string | { [key: string]: string }): Promise<Ingredient[]> => {
  try {
    const { data } = await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS_SEARCH, { params: { query } })

    return data;
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    throw error
  }
}

export { getAll }