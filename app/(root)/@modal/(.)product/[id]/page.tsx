import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
import prisma from "@/db";
import { notFound } from "next/navigation";

interface ProductIdPageProps {
  params: {
    id: string
  }
}

export default async function ProductIdPage(props: ProductIdPageProps) {
  const { params: { id } } = props;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      items: true,
    }
  })

  if (!product) return notFound();

  return (
    <ChooseProductModal
      product={product}
    />
  );
}