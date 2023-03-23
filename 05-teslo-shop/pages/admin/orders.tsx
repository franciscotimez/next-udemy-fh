import {
  ConfirmationNumberOutlined,
  PeopleOutlined,
} from "@mui/icons-material";
import { Chip, Grid, MenuItem, Select, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AdminLayout } from "../../components/layouts";
import { IOrder, IUser } from "../../interfaces";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { tesloApi } from "../../api";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Correo", width: 250 },
  { field: "name", headerName: "Nombre Completo", width: 200 },
  { field: "total", headerName: "Monto total" },
  {
    field: "isPaid",
    headerName: "Pagado",
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagado" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendiente" color="error" />
      );
    },
  },
  { field: "numberOfItems", headerName: "No Items", align: "center" },
  {
    field: "check",
    headerName: "ver Orden",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank">
          Ver Orden
        </a>
      );
    },
  },
  { field: "updatedAt", headerName: "Actualizada el", width: 200 },
];

const OrdersPage: NextPage = () => {
  const { data, error, mutate } = useSWR<IOrder[]>("/api/admin/orders");

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    return <Typography>Error al cargar la informacion</Typography>;
  }

  const onRoleUpdated = async (userId: string, newRole: string) => {
    try {
      await tesloApi.put("/admin/users", {
        userId,
        role: newRole,
      });
      mutate();
    } catch (error) {
      console.log({ error });
    }
  };

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    numberOfItems: order.numberOfItems,
    check: order,
    updatedAt: order.updatedAt,
  }));

  return (
    <AdminLayout
      title="Ordenes"
      subTitle="Administracion de Ordenes"
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
