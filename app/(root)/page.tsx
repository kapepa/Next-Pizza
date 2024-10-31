import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: GetSearchParams
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container
        className="mt-10"
      >
        <Title
          text="All pizza"
          size="lg"
          className="font-extrabold"
        />
      </Container>
      <TopBar
        categories={categories}
      />
      <Container
        className="pb-14 mt-10"
      >
        <div
          className="flex gap-[60px]"
        >
          <div
            className="w-[250px]"
          >
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div
            className="flex-1"
          >
            <div
              className="flex flex-col gap-16"
            >
              {
                categories.map((category, index) => (
                  !!category.product.length && <ProductsGroupList
                    key={`category-${index}-${category.id}`}
                    title={category.name}
                    products={category.product}
                    categoryId={category.id}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
