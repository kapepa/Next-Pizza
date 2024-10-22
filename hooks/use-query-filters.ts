import { useEffect } from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";

const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      sizes: Array.from(filters.sizes),
      pizzaTypes: Array.from(filters.pizzaTypes),
      ingredients: Array.from(filters.ingredients),
    }
    const queryString = qs.stringify(params, { arrayFormat: 'comma' });
    router.push(`?${queryString}`, { scroll: false });
  }, [router, filters])
}

export { useQueryFilters }