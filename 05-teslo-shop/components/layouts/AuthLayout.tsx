import Head from "next/head";
import React from "react";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FunctionComponent<Props> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
