import { DashboardOutlined } from "@mui/icons-material";
import type { NextPage } from "next";
import { AdminLayout } from "../../components/layouts";

const DashboardPage: NextPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas Generales"
      icon={<DashboardOutlined />}
    >
      <></>
    </AdminLayout>
  );
};

export default DashboardPage;
