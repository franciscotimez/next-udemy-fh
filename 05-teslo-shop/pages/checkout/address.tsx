import React, { useContext } from "react";
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
import { countries } from "../../utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { CartContext } from "../../context/cart/CartContext";

type FormData = {
  firstname: string;
  lastname: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const addressDefault: FormData = {
  firstname: "",
  lastname: "",
  address: "",
  address2: "",
  zip: "",
  city: "",
  country: countries[0].code,
  phone: "",
};

const getAddressFromCookies = (): FormData => {
  const addressCookie: FormData = JSON.parse(Cookies.get("address") || "{}");

  return { ...addressDefault, ...addressCookie };
};

const AddressPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitAddress = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout
      title="Direccion"
      pageDescription="Confirmar direccion del destino"
    >
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1">
          Direccion
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstname", {
                required: "Este campo es requerido",
              })}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastname", {
                required: "Este campo es requerido",
              })}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Direccion"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "Este campo es requerido",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Direccion 2 (opcional)"
              variant="filled"
              fullWidth
              {...register("address2")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Codigo Postal"
              variant="filled"
              fullWidth
              {...register("zip", {
                required: "Este campo es requerido",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Este campo es requerido",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Pais"
                defaultValue={defaultValues?.country}
                {...register("country", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.country}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefono"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="end">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies;

//   let isValidToken = false;

//   try {
//     jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
