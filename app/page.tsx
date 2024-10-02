import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductCard } from "@/components/shared/product-card";
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
                title="Pizza"
                products={[{
                  id: 1,
                  name: "Pizza chees",
                  imageUrl: "https://img.freepik.com/free-psd/freshly-baked-pizza-with-cut-slice-isolated-transparent-background_191095-9041.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid",
                  price: 550,
                  items: [{ price: 550 }],
                }]}
                categoryId={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
