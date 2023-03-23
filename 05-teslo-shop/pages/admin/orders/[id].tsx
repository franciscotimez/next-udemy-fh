import { GetServerSideProps } from "next";
import type { NextPage } from "next";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import {
  AssignmentOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

import { IOrder } from "../../../interfaces";
import { AdminLayout } from "../../../components/layouts";
import { CartList, OrderSummary } from "../../../components/cart";
import { dbOrders } from "../../../database";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <AdminLayout
      title={`Resumen de la Orden`}
      subTitle={`Orden: ${order._id}`}
      icon={<AssignmentOutlined />}
    >
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden ya fue pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "productos" : "producto"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
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

              <OrderSummary
                orderValues={{
                  subTotal: order.subtotal,
                  numberOfItems: order.numberOfItems,
                  tax: order.tax,
                  total: order.total,
                  taxRate: Number(process.env.NEXT_PUBLIC_TAX_RATE),
                }}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column">
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label="Orden ya fue pagada"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label="Pendiente de pago"
                      variant="outlined"
                      color="error"
                      icon={<CreditCardOffOutlined />}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/orders`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};
export default OrderPage;
