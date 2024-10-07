import { FC } from "react";

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage: FC<ProductPageProps> = ({ params: { id } }) => {
  return (
    <div>
      {id}
    </div>
  )
}

export default ProductPage;