import React from "react";
//import Deck from "./Deck";
//import { useState, useEffect } from "react";
import DeckView from "./DeckView";

    

function Decks({decks, removeDeck}){


//render list of decks using DeckView
// Passes removeDeck function
  const deckList = decks.map((deck, index) => {
    return(
      <div className="border border-solid" key={index}>
        <DeckView deck={deck} removeDeck={removeDeck} />
        </div>
      )
    });

    return (
    <div>
         <button>Create Deck</button>
        {deckList}
    </div>
    )
}

export default Decks;