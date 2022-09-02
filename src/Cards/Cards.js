import React from "react";
import Card from "./Card";

// default value of empty array and remove card passed down for delte button
function Cards({ cards = [] , removeCard }) {
  return cards.map((card, index) => {
    return (
      <div className="border border-solid" key={index}>
        <Card card={card} removeCard={removeCard} />
      </div>
    );
  });
}

export default Cards;
