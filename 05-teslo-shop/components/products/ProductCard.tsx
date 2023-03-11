import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import React from "react";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}
export const ProductCard: React.FunctionComponent<Props> = ({ product }) => {
  return (
    <Grid item xs={6} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`products/${product.images[0]}`}
            alt={product.title}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};
