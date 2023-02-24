import Head from "next/head";
import Link from "next/link";
import { MainLayout } from "../components/layouts/MainLayout";
import { NavBar } from "../components/NavBar";

export default function AboutPage() {
  return (
    <MainLayout>
      <h1 className="title">
        Ir a <Link href="/">Home</Link>
      </h1>

      <p className="description">
        Get started by editing <code className="code">pages/about.js</code>
      </p>
    </MainLayout>
  );
}
