import { Pokemon } from "../../context/PokemonContext";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: Pokemon | null;
  flipHorizontally?: boolean;
}

const PokemonCard = ({ pokemon, flipHorizontally }: PokemonCardProps) => {
  if (!pokemon) {
    return <p>No Pokémon selected</p>;
  }

  const { name, move, movePower, sprites } = pokemon;

  return (
    <div className="pokemon-card">
      <img
        className={`pokemon-image ${
          flipHorizontally ? "flip-horizontally" : ""
        }`}
        src={sprites.front_default}
        alt={name}
      />
      <h2 className="pokemon-name">{name}</h2>
      <p className="pokemon-move">
        {move ? move.name : "No move selected"}
        {movePower !== null && ` - ${movePower}`}
      </p>
    </div>
  );
};

export default PokemonCard;
