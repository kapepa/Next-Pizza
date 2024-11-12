import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
import prisma from "@/db";
import { notFound } from "next/navigation";

interface ProductIdPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductIdPage(props: ProductIdPageProps) {
  const { params } = props;
  const getId = (await params).id;

  const product = await prisma.product.findUnique({
    where: { id: getId },
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