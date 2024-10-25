import { cn } from "../lib/utils";
import { FC } from "react";
import { useSpring, animated } from "@react-spring/web";
import { suitSymbols } from "../lib/contants";
import { Cards } from "../lib/types";
import { useAtom } from "jotai";
import { flippedAtom } from "../lib/atoms";

type CardProps = Cards;

export const Card: FC<CardProps> = ({ suit, rank }) => {
  const [flipped, setFlipped] = useAtom(flippedAtom);

  const { transform, opacity } = useSpring({
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    opacity: flipped ? 0 : 1,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const cardColorClass = cn({
    "text-red-500": suit === "Carreau" || suit === "Coeur",
    "text-black": suit === "Trèfle" || suit === "Pique",
  });

  return (
    <div
      onClick={() => setFlipped((state) => !state)}
      className="relative w-20 h-32 cursor-pointer"
    >
      {/* Front of the card */}
      <animated.div
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          rotateY: flipped ? "180deg" : "0deg",
        }}
        className={cn(
          "absolute w-full h-full bg-white border border-gray-200 rounded-lg p-2 m-2 flex flex-col items-center justify-between shadow-md shadow-gray-500",
          cardColorClass
        )}
      >
        <span className="text-lg font-bold">{rank}</span>
        <span className="text-2xl">{suitSymbols[suit]}</span>
      </animated.div>

      <animated.div
        style={{
          opacity,
          transform,
          rotateY: flipped ? "0deg" : "-180deg",
        }}
        className="absolute w-full h-full bg-blue-500 border border-gray-200 rounded-lg p-2 m-2 flex items-center justify-center shadow-md shadow-gray-500"
      >
        <span className="text-white text-xl font-semibold">🛹</span>
      </animated.div>
    </div>
  );
};
