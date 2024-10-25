import { useAtom } from "jotai";
import { gameStateAtom } from "./lib/atoms";
import { Hand } from "./components/Hand";
import { useGetRandomHands } from "./hooks/useGetRandomCard";
import { evaluatePokerHand } from "./lib/utils";

function App() {
  const [gameState, setGameState] = useAtom(gameStateAtom);

  const handleStartGame = () => {
    const playersHand = useGetRandomHands();
    const computersHand = useGetRandomHands();

    setGameState({
      playersHand,
      computersHand,
      playersName: "Player1",
      status: "En cours",
      winner: undefined,
    });
  };

  const evaluateHands = () => {
    const hands = {
      [gameState.playersName]: gameState.playersHand,
      computer: gameState.computersHand,
    };

    const countValues = (hand) => {
      const counts = Array(9).fill(0);
      const values = [];

      hand.forEach((card) => {
        counts[card.value] += 1;
        if (!values.includes(card.value)) values.push(card.value);
      });

      return { counts, values: values.sort((a, b) => a - b) };
    };

    const playerHandCounts = countValues(hands[gameState.playersName]);
    const computerHandCounts = countValues(hands.computer);

    const playerResult = evaluatePokerHand(
      playerHandCounts.counts,
      playerHandCounts.values
    );
    const computerResult = evaluatePokerHand(
      computerHandCounts.counts,
      computerHandCounts.values
    );

    let winner = "";
    let winngingString = "";
    let winningValue = 0;

    if (playerResult.value > computerResult.value) {
      winner = gameState.playersName;
      winngingString = playerResult.winningString;
      winningValue = playerResult.winningValue || 0;
    } else if (playerResult.value < computerResult.value) {
      winner = "computer";
      winngingString = computerResult.winningString;
      winningValue = computerResult.winningValue || 0;
    } else {
      if (playerResult.winningValue > computerResult.winningValue || 0) {
        winner = gameState.playersName;
        winngingString = playerResult.winningString;
        winningValue = playerResult.winningValue || 0;
      } else if (playerResult.winningValue < computerResult.winningValue || 0) {
        winner = "computer";
        winngingString = computerResult.winningString;
        winningValue = computerResult.winningValue || 0;
      } else {
        winner = "Tie";
        winngingString = `Computer: ${
          computerResult.winningValue || 0
        } Player: ${playerResult.winningValue}`;
      }
    }

    console.log("Winner:", winner);
    setGameState((prevState) => ({
      ...prevState,
      winner,
      winngingString,
      winningValue,
      status: "Terminé",
    }));
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
            <Hand
              playerName={gameState.playersName}
              rHand={gameState.playersHand}
            />

            <Hand playerName="Computer" rHand={gameState.computersHand} />
          </div>

          <button
            onClick={evaluateHands}
            className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-700"
          >
            Évaluer les Mains
          </button>
        </>
      )}

      {gameState.status === "Terminé" && (
        <h2 className="text-2xl font-bold">
          {gameState.winner && `Le gagnant est ${gameState.winner}`}
          <br />
          {gameState.winngingString && `Won with: ${gameState.winngingString}`}
          <br />
          {gameState.winningValue && `Final score: ${gameState.winningValue}`}
        </h2>
      )}
    </div>
  );
}

export default App;
