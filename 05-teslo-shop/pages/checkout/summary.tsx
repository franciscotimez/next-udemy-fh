import type { NextPage } from "next";
import NextLink from "next/link";

import {
  Link,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList, OrderSummary } from "../../components/cart";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage: NextPage = () => {
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("address")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = () => {
    createOrder();
  };

  return (
    <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{" "}
                {numberOfItems === 1 ? "producto" : "productos"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {shippingAddress?.firstname} {shippingAddress?.lastname}
              </Typography>
              <Typography>{shippingAddress?.address}</Typography>
              <Typography>{shippingAddress?.address2}</Typography>
              <Typography>
                {shippingAddress?.city}, {shippingAddress?.zip},{" "}
                {shippingAddress?.country}
              </Typography>
              <Typography>{shippingAddress?.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                >
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
