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

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

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

  const getRandomPokemons = useCallback((): Pokemon[] => {
    const randomUniqueNumbers = new Set<number>();
    while (randomUniqueNumbers.size < 2) {
      randomUniqueNumbers.add(getRandomNumber(pokemonList.length));
    }
    return Array.from(randomUniqueNumbers).map((index) => pokemonList[index]);
  }, [pokemonList]);

  const fetchPokemonDetails = async (url: string): Promise<Pokemon | null> => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Pokémon details");
      return null;
    }
  };

  const setupBattle = useCallback(async () => {
    setLoading(true);
    setError(null);
    setPokemonOne(null);
    setPokemonTwo(null);
    setBattleLog("");

    const [randomPokemonOne, randomPokemonTwo] = getRandomPokemons();

    const [pokemonOneDetails, pokemonTwoDetails] = await Promise.all([
      fetchPokemonDetails(randomPokemonOne.url),
      fetchPokemonDetails(randomPokemonTwo.url),
    ]);

    if (pokemonOneDetails && pokemonTwoDetails) {
      const pokemonOneMove =
        pokemonOneDetails.moves[
          getRandomNumber(pokemonOneDetails.moves.length)
        ];
      const pokemonTwoMove =
        pokemonTwoDetails.moves[
          getRandomNumber(pokemonTwoDetails.moves.length)
        ];

      if (pokemonOneMove?.move && pokemonTwoMove?.move) {
        setPokemonOne({
          ...pokemonOneDetails,
          move: pokemonOneMove.move,
          movePower: null,
        });
        setPokemonTwo({
          ...pokemonTwoDetails,
          move: pokemonTwoMove.move,
          movePower: null,
        });
      }
    }
    setLoading(false);
  }, [getRandomPokemons]);

  useEffect(() => {
    if (pokemonList.length) {
      setupBattle();
    }
  }, [pokemonList, setupBattle]);

  const startBattle = async () => {
    if (!pokemonOne || !pokemonTwo) return;

    setLoading(true);
    try {
      const [{ data: pokemonOneMove }, { data: pokemonTwoMove }] =
        await Promise.all([
          axios.get(pokemonOne.move!.url),
          axios.get(pokemonTwo.move!.url),
        ]);

      setPokemonOne((prev) => ({
        ...prev!,
        movePower: pokemonOneMove.power || 0,
      }));
      setPokemonTwo((prev) => ({
        ...prev!,
        movePower: pokemonTwoMove.power || 0,
      }));

      let log = `Draw !!!`;
      if (pokemonOneMove.power > pokemonTwoMove.power) {
        log = `${pokemonOne.name} lands a decisive blow with ${
          pokemonOne.move!.name
        } knocking out ${pokemonTwo.name} !`;
      } else if (pokemonTwoMove.power > pokemonOneMove.power) {
        log = `${pokemonTwo.name} lands a decisive blow with ${
          pokemonTwo.move!.name
        } knocking out ${pokemonOne.name} !`;
      }
      setBattleLog(log);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch move details");
    }
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
