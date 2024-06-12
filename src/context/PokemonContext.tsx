import { createContext, ReactNode } from "react";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonContextType {
  pokemonOne: Pokemon | null;
  pokemonTwo: Pokemon | null;
  setupBattle: () => void;
  startBattle: () => void;
  battleLog: string;
  loading: boolean;
  error: string | null;
}

interface PokemonProviderProps {
  children: ReactNode;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const PokemonProvider = ({ children }: PokemonProviderProps) => {
  return (
    <PokemonContext.Provider value={undefined}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
