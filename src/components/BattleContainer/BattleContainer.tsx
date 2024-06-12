import { useContext } from "react";
import {
  PokemonContext,
  PokemonContextType,
} from "../../context/PokemonContext";
import PokemonCard from "../PokemonCard/PokemonCard";

const BattleContainer = () => {
  const {
    pokemonOne,
    pokemonTwo,
    startBattle,
    battleLog,
    loading,
    error,
  } = useContext(PokemonContext) as PokemonContextType;

  const handleButtonClick = () => {
      startBattle();
  };

  return (
    <div>
      <h1>Pokémon Battle</h1>
      <div>
        <PokemonCard pokemon={pokemonOne} />
        <PokemonCard pokemon={pokemonTwo} />
      </div>
      {battleLog && <div>{battleLog}</div>}
      {error && <div>{error}</div>}
      {loading && <div>Loading..</div>}
      <button onClick={handleButtonClick}>Start Battle</button>
    </div>
  );
};

export default BattleContainer;
