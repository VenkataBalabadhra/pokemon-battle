import { Pokemon } from "../../context/PokemonContext";

interface PokemonCardProps {
  pokemon: Pokemon | null;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  if (!pokemon) {
    return <div>No Pokémon selected</div>;
  }

  return (
    <div>
      <img src="" alt="" />
      <h2>Pokemon Name</h2>
      <div>Move Name - Move Power</div>
    </div>
  );
};

export default PokemonCard;
