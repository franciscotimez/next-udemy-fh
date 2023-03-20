import { GetServerSideProps } from "next";
import React from "react";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { isValidToken } from "../../utils/jwt";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { jwt } from "../../utils";

const AddressPage = () => {
  return (
    <ShopLayout
      title="Direccion"
      pageDescription="Confirmar direccion del destino"
    >
      <Typography variant="h1" component="h1">
        Direccion
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Direccion" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Direccion 2 (opcional)"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Codigo Postal" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Ciudad" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="Pais" value={1}>
              <MenuItem value={1}>Argentina</MenuItem>
              <MenuItem value={2}>Honduras</MenuItem>
              <MenuItem value={3}>Canada</MenuItem>
              <MenuItem value={4}>Brasil</MenuItem>
              <MenuItem value={5}>Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Telefono" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="end">
        <Button color="secondary" className="circular-btn" size="large">
          Revisar Pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = "" } = req.cookies;

  let isValidToken = false;

  try {
    jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/auth/login?p=/checkout/address",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default AddressPage;
