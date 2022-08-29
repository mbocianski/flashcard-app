import React from "react";
import {Link} from "react-router-dom";


function StudyDeck({deck}){

    const cardCount = deck.cards.length;

    if (cardCount < 3){
        return (
            <>
            <h2>{`Study: ${deck.name}`}</h2>
            <div className="border border-solid">
                <h3>Not Enough Cards.</h3>
                <p>{`You need at least 3 cards to study. 
                There are ${cardCount} cards in this deck.`}</p>
                <Link to={`/decks/${deck.id}/cards/new`}>
                    <button>Add Cards</button>
                </Link>
            </div>
        </>
        )
    }
    return(
        <>
            <h2>{`Study: ${deck.name}`}</h2>
            <div className="border border-solid">
                
            </div>
        </>
    )
}

export default StudyDeck