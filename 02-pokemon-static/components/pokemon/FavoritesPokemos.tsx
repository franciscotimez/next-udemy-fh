import { Grid } from "@nextui-org/react";
import React from "react";
import { FavoriteCardPokemon } from "./";

interface Props {
  pokemonsIds: number[];
}

export const FavoritesPokemos: React.FunctionComponent<Props> = ({
  pokemonsIds,
}) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemonsIds.map((id) => (
        <FavoriteCardPokemon key={id} pokemonId={id} />
      ))}
    </Grid.Container>
  );
};
