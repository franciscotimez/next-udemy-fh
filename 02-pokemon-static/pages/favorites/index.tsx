import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { PokemonData } from "../../interfaces";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { Card, Grid } from "@nextui-org/react";
import { FavoritesPokemos } from "../../components/pokemon";

const FavoritesPage: NextPage = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemos);
  }, []);

  return (
    <Layout title="Pokemons - Favorites">
      {favoritesPokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemos pokemonsIds={favoritesPokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
