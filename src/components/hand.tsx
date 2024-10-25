import { FC, useEffect } from "react";
import { Card } from "./Card";
import { Cards } from "../lib/types";
import { useAtom } from "jotai";
import { handAtom } from "../lib/atoms";

type HandProps = {
  playerName: string;
  rHand: Cards[];
  onBlockCard?: (index: number) => void;
  blockedCards?: boolean[];
};

export const Hand: FC<HandProps> = ({
  playerName,
  rHand,
  onBlockCard = () => {},
  blockedCards = [],
}) => {
  const [hand, setHand] = useAtom<Cards[]>(handAtom);

  useEffect(() => {
    setHand(rHand);
  }, [rHand]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">{playerName}</h2>
      <div className="flex space-x-2">
        {hand.map((card, index) => (
          <Card
            key={index}
            suit={card.suit}
            rank={card.rank}
            value={card.value}
            isBlocked={blockedCards[index]}
            onClick={() => onBlockCard(index)}
          />
        ))}
      </div>
    </div>
  );
};
