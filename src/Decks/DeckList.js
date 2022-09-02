import React from "react";
import DeckView from "./DeckView";

function DeckList({decks=[], removeDeck}){

  //render list of decks using DeckView
  // Passes removeDeck function
if (decks.length > 0){
    decks.map((deck, index) => {
        return (
          <div className="border border-solid" key={index}>
            <DeckView deck={deck} removeDeck={removeDeck} />
          </div>
        );
      });
    }
    return null;
}


export default DeckList;
