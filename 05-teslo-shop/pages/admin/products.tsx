import type { NextPage } from "next";
import { CardMedia, Grid, Typography } from "@mui/material";
import { CategoryOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";

import { AdminLayout } from "../../components/layouts";
import { currency } from "../../utils";
import { IProduct } from "../../interfaces";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell({ row }: GridRenderCellParams) {
      return (
        <a href={`/product/${row.slug}`} target="_blank">
          <CardMedia
            component="img"
            alt={`${row.title}`}
            className="fadeIn"
            image={`/products/${row.img}`}
          />
        </a>
      );
    },
  },
  { field: "title", headerName: "Title", width: 250 },
  { field: "gender", headerName: "Genero" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage: NextPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    return <Typography>Error al cargar la informacion</Typography>;
  }

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: currency.format(product.price),
    sizes: product.sizes.join(" | "),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle="Administracion de Productos"
      icon={<CategoryOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
