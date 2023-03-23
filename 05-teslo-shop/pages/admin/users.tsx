import { PeopleOutlined } from "@mui/icons-material";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AdminLayout } from "../../components/layouts";
import { IUser } from "../../interfaces";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { tesloApi } from "../../api";

const UsersPage: NextPage = () => {
  const { data, error, mutate } = useSWR<IUser[]>("/api/admin/users");

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

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre Completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            sx={{ width: "300px" }}
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
          >
            {["admin", "client", "super-user", "SEO"].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
  ];

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title="Usuarios"
      subTitle="Administracion de Usuarios"
      icon={<PeopleOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
