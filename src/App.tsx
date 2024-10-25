import { useAtom } from "jotai";
import { blockedCardsAtom, gameStateAtom, turnsLeftAtom } from "./lib/atoms";
import { Hand } from "./components/Hand";
import { useGetRandomHands } from "./hooks/useGetRandomCard";
import { evaluatePokerHand } from "./lib/utils";

function App() {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [turnsLeft, setTurnsLeft] = useAtom<number>(turnsLeftAtom);
  const [blockedCards, setBlockedCards] = useAtom<boolean[]>(blockedCardsAtom);

  const handleStartGame = () => {
    const playersHand = useGetRandomHands();
    const computersHand = useGetRandomHands();

    setGameState({
      playersHand,
      computersHand,
      playersName: "Player1",
      status: "En cours",
      winner: undefined,
      winngingString: "",
      winningValue: 0,
    });

    setTurnsLeft(3);
    setBlockedCards(Array(playersHand.length).fill(false));
  };

  const handleBlockCard = (index: number) => {
    setBlockedCards((prev) => {
      const newBlockedCards = [...prev];
      newBlockedCards[index] = !newBlockedCards[index];
      return newBlockedCards;
    });
  };

  const handleReplaceCards = () => {
    if (turnsLeft > 0) {
      const newHand = gameState.playersHand.map((card, i) =>
        blockedCards[i] ? card : useGetRandomHands()[i]
      );

      setGameState((prevState) => ({
        ...prevState,
        playersHand: newHand,
      }));
      setTurnsLeft(turnsLeft - 1);
    }
  };

  const evaluateHands = () => {
    const hands = {
      [gameState.playersName]: gameState.playersHand,
      computer: gameState.computersHand,
    };

    const countValues = (hand: typeof gameState.playersHand) => {
      const counts = Array(9).fill(0);
      const values: number[] = [];

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
      winningValue = playerResult.winningValue;
    } else if (playerResult.value < computerResult.value) {
      winner = "computer";
      winngingString = computerResult.winningString;
      winningValue = computerResult.winningValue;
    } else {
      winner = "Tie";
      winngingString = `Computer: (${computerResult.winningString} of ${computerResult.winningValue}) | Player: (${playerResult.winningString} of ${playerResult.winningValue})`;
      winningValue = -1;
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
              onBlockCard={handleBlockCard} // Pass the block function to Hand
              blockedCards={blockedCards} // Pass the blocked state
            />
            <Hand playerName="Computer" rHand={gameState.computersHand} />
          </div>

          <button
            onClick={handleReplaceCards}
            className="bg-yellow-500 text-white py-2 px-4 rounded shadow hover:bg-yellow-700"
            disabled={turnsLeft <= 0}
          >
            Remplacer les Cartes ({turnsLeft} tours restants)
          </button>

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
          {gameState.winningValue !== -1 &&
            `Final score: ${gameState.winningValue}`}
        </h2>
      )}
    </div>
  );
}

export default App;
