import { Container } from "@/components/shared/container";
import { ProductForm } from "@/components/shared/product-form";
import prisma from "@/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ProductIdPageProps {
  params: Promise<{ id: string }>
}

const ProductIdPage: FC<ProductIdPageProps> = async (props) => {
  const { params } = props;
  const getId = (await params).id

  const product = await prisma.product.findUnique({
    where: { id: getId },
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