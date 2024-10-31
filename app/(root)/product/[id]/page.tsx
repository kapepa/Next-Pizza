import { Container } from "@/components/shared/container";
import { ProductForm } from "@/components/shared/product-form";
import prisma from "@/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ProductIdPageProps {
  params: {
    id: string
  }
}

const ProductIdPage: FC<ProductIdPageProps> = async ({ params: { id } }) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      category: {
        include: {
          product: {
            include: {
              items: true,
            }
          }
        }
      },
      items: true,
    }
  });

  if (!product) return notFound();

  return (
    <Container
      className="flex flex-col my-10"
    >
      <ProductForm
        product={product}
      />
    </Container>
  )
}

export default ProductIdPage;