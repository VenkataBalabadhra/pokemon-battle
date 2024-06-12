import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import axios from "axios";

interface PokemonMove {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  moves: Array<{ move: PokemonMove }>;
  move?: PokemonMove | undefined;
  movePower?: number | null;
}

export interface PokemonContextType {
  pokemonOne: Pokemon | null;
  pokemonTwo: Pokemon | null;
  startBattle: () => void;
  setupBattle: () => void;
  battleLog: string;
  loading: boolean;
  error: string | null;
}

interface PokemonProviderProps {
  children: ReactNode;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonOne, setPokemonOne] = useState<Pokemon | null>(null);
  const [pokemonTwo, setPokemonTwo] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const { data } = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        setPokemonList(data.results);
      } catch (err) {
        setError("Failed to fetch Pokémon list");
      }
    };

    fetchPokemonList();
  }, []);

  const setupBattle = useCallback(async () => {
    setLoading(true);
    setError(null);
    setBattleLog("");
    // setup logic goes here
    setLoading(false);
  }, []);

  useEffect(() => {
    if (pokemonList.length) {
      setupBattle();
    }
  }, [pokemonList, setupBattle]);

  const startBattle = async () => {
    if (!pokemonOne || !pokemonTwo) return;

    setLoading(true);
    // battle logic goes here
    setLoading(false);
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonOne,
        pokemonTwo,
        startBattle,
        setupBattle,
        battleLog,
        loading,
        error,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
