import { useAtom } from "jotai";
import { gameStateAtom } from "./lib/atoms";
import { Hand } from "./components/Hand";
import { useGetRandomHands } from "./hooks/useGetRandomCard";

function App() {
  const [gameState, setGameState] = useAtom(gameStateAtom);

  const handleStartGame = () => {
    const [player1Hand, player2Hand] = useGetRandomHands();

    setGameState({
      player1Hand,
      player2Hand,
      status: "En cours",
      winner: undefined,
    });
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Jeu de Poker à Deux Joueurs
      </h1>

      {gameState.status === "Attente" && (
        <button
          onClick={handleStartGame}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
        >
          Démarrer le Jeu
        </button>
      )}

      {gameState.status === "En cours" && (
        <>
          <div className="flex justify-between space-x-8">
            <Hand playerName="Joueur 1" rHand={gameState.player1Hand} />
            <Hand playerName="Joueur 2" rHand={gameState.player2Hand} />
          </div>

          <button
            onClick={() => {}}
            className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-700"
          >
            Évaluer les Mains
          </button>
        </>
      )}

      {gameState.status === "Terminé" && (
        <h2 className="text-2xl font-bold">
          {gameState.winner ? `Le gagnant est ${gameState.winner}` : "Égalité"}
        </h2>
      )}
    </div>
  );
}

export default App;
