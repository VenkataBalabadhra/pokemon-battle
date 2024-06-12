import { PokemonProvider } from "./context/PokemonContext";
import BattleContainer from "./components/BattleContainer/BattleContainer";

function App() {
  return (
    <PokemonProvider>
      <BattleContainer />
    </PokemonProvider>
  );
}

export default App;
