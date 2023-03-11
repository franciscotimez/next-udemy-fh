import { Grid } from "@mui/material";
import React from "react";
import { IProduct } from "../../interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
  products: IProduct[];
}
export const ProductList: React.FunctionComponent<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
