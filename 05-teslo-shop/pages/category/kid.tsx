import type { NextPage } from "next";
import { Typography } from "@mui/material";

import { useProducts } from "../../hooks";
import { ShopLayout } from "../../components/layouts";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from "../../components/products";

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title={"Teslo-Shop - Kids"}
      pageDescription={"Encuentra los mejores productos de Teslo para Niños!"}
    >
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
