import { cards } from "../lib/cards.json";
import { Cards } from "../lib/types";

const getRandomElementFromArray = (array: Cards[]): Cards => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const GetRandomHand = () => {
  const hand = [];
  const selectedCards = new Set();

  while (hand.length < 4) {
    const card = getRandomElementFromArray(cards);
    const cardId = `${card.rank}-${card.suit}`;
    if (!selectedCards.has(cardId)) {
      hand.push(card);
      selectedCards.add(cardId);
    }
  }

  return hand;
};

export const useGetRandomHands = () => {
  const playerHand = GetRandomHand();
  return playerHand;
};
