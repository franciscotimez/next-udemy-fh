import Head from "next/head";
import React from "react";
import { NavBar } from "../ui";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FunctionComponent<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Francisco Timez" />
        <meta
          name="description"
          content={`Informacion sobre pokemon ${title}`}
        />
        <meta name="keywords" content={` ${title}, pokemon, pokedex`} />
      </Head>

      <NavBar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
