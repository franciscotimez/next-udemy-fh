import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

import { pokeApi } from "../../api";
import { PokemonData, PokemonResponse } from "../../interfaces";
import { getPokemonInfo } from "../../utils";

import PokemonPage from "../pokemon/[id]";

interface Props {
  pokemon: PokemonData;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return <PokemonPage pokemon={pokemon} />;
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonResponse>(`/pokemon?limit=151`);
  const pokemons151: string[] = data.results.map((value) => value.name);

  return {
    paths: pokemons151.map((name) => ({
      params: { name },
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
  const { name } = params as { name: string };

  return {
    props: { pokemon: await getPokemonInfo(name) },
  };
};

export default PokemonByNamePage;
