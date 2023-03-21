import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { currency } from "../../utils";

interface Props {
  orderValues?: {
    subTotal: number;
    numberOfItems: number;
    tax: number;
    total: number;
    taxRate: number;
  };
}

export const OrderSummary: React.FunctionComponent<Props> = ({
  orderValues,
}) => {
  const cart = useContext(CartContext);
  const summaryValues = orderValues ? orderValues : cart;

  const { subTotal, numberOfItems, tax, total, taxRate } = summaryValues;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} item{numberOfItems > 1 ? "s" : ""}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({taxRate * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
