import React, { useContext } from "react";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context/cart/CartContext";
import { ICartProduct } from "../../interfaces/cart";
import { currency } from "../../utils";

interface Props {
  editable?: boolean;
}

export const CartList: React.FunctionComponent<Props> = ({
  editable = false,
}) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onUpdateCartQuantity = (product: ICartProduct, newQuantity: number) => {
    product.quantity = newQuantity;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => {
        return (
          <Grid
            container
            spacing={2}
            key={product.slug + product.size}
            sx={{ mb: 1 }}
          >
            <Grid item xs={3}>
              <NextLink
                href={`/product/${product.slug}`}
                passHref
                legacyBehavior
              >
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla: <strong>{product.size}</strong>
                </Typography>

                {/* Condicional */}
                {editable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={product.inStock}
                    onUpdateValue={(newValue) =>
                      onUpdateCartQuantity(product, newValue)
                    }
                  />
                ) : (
                  <Typography variant="h6">
                    {product.quantity} producto{product.quantity > 1 ? "s" : ""}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">{currency.format(product.price)}</Typography>
              {editable && (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => removeCartProduct(product)}
                >
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
