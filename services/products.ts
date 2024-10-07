import { Product } from "@prisma/client"
import { instance } from "./instance"
import { ApiRoutes } from "./constants";

export const search = async (query: string | { [key: string]: string }): Promise<Product[]> => {
  try {
    const { data } = await instance.get<Product[]>(ApiRoutes.PRODUCTS_SEARCH, { params: query });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error
  }
}