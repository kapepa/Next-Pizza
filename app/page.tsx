import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";

export default function Home() {
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
      <TopBar />
      <Container
        className="pb-14 mt-10"
      >
        <div
          className="flex gap-[60px]"
        >
          <div
            className="w-[250px]"
          >
            <Filters />
          </div>

          <div
            className="flex-1"
          >
            <div
              className="flex flex-col gap-16"
            >
              <ProductsGroupList
                title="Pizzas"
                products={Array(4).fill({
                  id: 1,
                  name: "Pizza chees",
                  imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.jpg",
                  price: 550,
                  items: [{ price: 550 }],
                })}
                categoryId={0}
              />
              <ProductsGroupList
                title="Combos"
                products={Array(4).fill({
                  id: 2,
                  name: "Pizza chees",
                  imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.jpg",
                  price: 550,
                  items: [{ price: 550 }],
                })}
                categoryId={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
