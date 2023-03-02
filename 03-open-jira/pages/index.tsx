import type { NextPage } from "next";

import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>

          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />

            <CardContent>
              {/* agregar una nueva entrada */}
              {/* Listado de entradas */}
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12} sm={4}>

          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En Proceso" />
          </Card>

        </Grid>
        <Grid item xs={12} sm={4}>

          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
          </Card>
          
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
