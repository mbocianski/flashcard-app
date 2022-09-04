import React from "react";
import Card from "./Card";

// default value of empty array and remove card passed down for delte button
function Cards({ cards = [] , removeCard }) {
  return cards.map((card, index) => {
    return (
      <div className="border border-solid rounded pl-4 pr-3 py-4" key={index}>
        <Card card={card} removeCard={removeCard} />
      </div>
    );
  });
}

export default Cards;
