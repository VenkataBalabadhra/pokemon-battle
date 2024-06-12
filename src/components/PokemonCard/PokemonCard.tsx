import { Pokemon } from "../../context/PokemonContext";

interface PokemonCardProps {
  pokemon: Pokemon | null;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  if (!pokemon) {
    return <div>No Pokémon selected</div>;
  }

  const { name, sprites, move, movePower,  } = pokemon;

  return (
    <div>
      <img src={sprites.front_default} alt={name} />
      <h2>{name}</h2>
      <div>{move?.name} - {movePower}</div>
    </div>
  );
};

export default PokemonCard;
