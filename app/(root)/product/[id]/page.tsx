import { Container } from "@/components/shared/container";
import { GroupVariants } from "@/components/shared/group-variants";
import { ProductImage } from "@/components/shared/pizza-image";
import { Title } from "@/components/shared/title";
import prisma from "@/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage: FC<ProductPageProps> = async ({ params: { id } }) => {
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) return notFound();

  return (
    <Container
      className="flex flex-col my-10"
    >
      <div
        className="flex flex-1"
      >
        <ProductImage
          size={40}
          imageUrl={product.imageUrl}
        />
        <div
          className="w-[490px] bg-[#f7f6f5] p-7"
        >
          <Title
            size="md"
            text={product.name}
            className="font-extrabold mb-1"
          />
          <p
            className="text-gray-400"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum sunt accusamus illo, laboriosam exercitationem architecto facere hic sequi quos. Ab placeat, provident itaque nam laboriosam molestias rem maxime reprehenderit suscipit.
          </p>
          <GroupVariants
            items={[
              {
                name: "Small",
                value: "1",
              },
              {
                name: "Middle",
                value: "2",
              },
              {
                name: "Large",
                value: "3",
                disabled: true,
              },
            ]}
            selectedValue="2"
          />
        </div>
      </div>
    </Container>
  )
}

export default ProductPage;