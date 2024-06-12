import { useContext } from "react";
import {
  PokemonContext,
  PokemonContextType,
} from "../../context/PokemonContext";

const BattleContainer = () => {
  const { pokemonOne, pokemonTwo } = useContext(
    PokemonContext
  ) as PokemonContextType;

  return (
    <div>
      <h1>Pokémon Battle</h1>
      <div>
        <div>Polemon One</div>
        <div>Polemon Two</div>
      </div>
      <div>Log container</div>
      <div>Error container</div>
      <button>Start Battle</button>
    </div>
  );
};

export default BattleContainer;
