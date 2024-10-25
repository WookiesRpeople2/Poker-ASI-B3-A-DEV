import * as clsx from "clsx";
import { FC } from "react";
import { suitSymbols } from "../lib/contants";
import { Cards } from "../lib/types";

type CardProps = Cards;

export const Card: FC<CardProps> = ({ suit, rank }) => {
  const cardColorClass = clsx({
    "text-red-500": suit === "Carreau" || suit === "Coeur",
    "text-black": suit === "Trèfle" || suit === "Pique",
  });

  return (
    <div
      className={clsx(
        "w-20 h-32 bg-white border border-gray-200 rounded-lg shadow-md p-2 m-2 flex flex-col items-center justify-between",
        cardColorClass
      )}
    >
      <span className="text-lg font-bold">{rank}</span>
      <span className="text-2xl">{suitSymbols[suit]}</span>
    </div>
  );
};
