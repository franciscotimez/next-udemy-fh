import Head from "next/head";
import React from "react";

interface Props {
  title?: string;
}

export const Layout: React.FC<Props> = ({ children, title }) => {
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
      <main>{children}</main>
    </>
  );
};
