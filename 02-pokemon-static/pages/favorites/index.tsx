import { NextPage } from "next";
import React from "react";

import { PokemonData } from "../../interfaces";
import { Layout } from "../../components/layouts";

interface Props {
  pokemon: PokemonData;
}

const FavoritesPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title="Algun Pokemon">
      
    </Layout>
  );
};

export default FavoritesPage;
