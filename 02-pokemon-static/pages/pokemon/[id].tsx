import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { pokeApi } from "../../api";
import { PokemonData } from "../../interfaces";
import { Layout } from "../../components/layouts";

interface Props {
  pokemon: PokemonData;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  console.log({ pokemon });

  return (
    <Layout title="Algun Pokemon">
      <h1>{pokemon.name}</h1>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonData>(`/pokemon/${id}`);

  return {
    props: { pokemon: data },
  };
};

export default PokemonPage;
