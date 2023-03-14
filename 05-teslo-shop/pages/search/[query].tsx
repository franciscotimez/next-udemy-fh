import type { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";

interface Props {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout
      title={"Teslo-Shop - Search"}
      pageDescription={"Encuentra los mejores productos de Teslo aqui!"}
    >
      <Typography variant="h1" component="h1">
        Buscar Producto
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        ABC--1234
      </Typography>

      <ProductList products={products} />
    </ShopLayout>
  );
};

// * ServerSideProps para generar la pagina bajo demanda
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces/products";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);

  // todo: retornar otros productos relacionados

  return {
    props: { products },
  };
};
export default SearchPage;
