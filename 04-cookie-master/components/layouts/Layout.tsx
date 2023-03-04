import Head from "next/head";
import React from "react";
import { NavBar } from "../ui";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        
      </Head>
      <nav>
        <NavBar />
      </nav>
      <main style={{ padding: "20px 50px" }}>{children}</main>
    </>
  );
};
