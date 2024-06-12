import { useContext } from "react";
import {
  PokemonContext,
  PokemonContextType,
} from "../../context/PokemonContext";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./BattleContainer.css";

const BattleContainer = () => {
  const {
    pokemonOne,
    pokemonTwo,
    startBattle,
    setupBattle,
    battleLog,
    loading,
    error,
  } = useContext(PokemonContext) as PokemonContextType;

  const handleButtonClick = () => {
    if (battleLog || error) {
      setupBattle();
    } else {
      startBattle();
    }
  };

  return (
    <div className="battle-view">
      <h1 className="title">Pokémon Battle</h1>
      <div className="cards-container">
        <PokemonCard pokemon={pokemonOne} flipHorizontally />
        <PokemonCard pokemon={pokemonTwo} />
      </div>
      {battleLog && <p className="battle-log">{battleLog}</p>}
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <button className="battle-button" onClick={handleButtonClick}>
          {battleLog || error ? "Reset" : "Start Battle"}
        </button>
      )}
    </div>
  );
}

export default BattleContainer;
