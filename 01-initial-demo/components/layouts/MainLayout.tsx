import { FC } from 'react';

import styles from "./MainLayout.module.css";
import Head from 'next/head';

import { NavBar } from "../NavBar";

export const MainLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Francisco</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};
