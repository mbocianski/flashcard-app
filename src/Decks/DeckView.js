import React from "react";
import DeleteDeck from "./DeleteDeck";



function DeckView({deck:{name, id, description,cards}, removeDeck}){
//const name = deck.name;
//const id = deck.id;
//const description = deck.description;
//const cards = deck.cards;
const cardCount = cards.length;
    return (
        <div>
        <h2>{name}</h2>
        <p>{`${cardCount} cards`}</p>
        <p>{description}</p>
        <button>View</button>
        <button>Study</button>
        <DeleteDeck deckId={id} removeDeck={removeDeck} />
        </div>
        
    )
}


export default DeckView;