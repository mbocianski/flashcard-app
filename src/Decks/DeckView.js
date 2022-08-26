import React from "react";
import DeleteDeck from "./DeleteDeck";
import {useLocation, Link} from "react-router-dom"
import NotFound from "../Layout/NotFound";
//import {useEffect} from "react";


//extracts keys from each deck and builds them into an info card
function DeckView({deck:{name, id, description,cards=[]}, removeDeck}){

const {pathname} = useLocation();
const cardCount = cards.length;

let deckButtons;
if (pathname === "/"){
    deckButtons = <>
         <Link to={`decks/${id}`}>
            <button>View</button>
        </Link>
        <button>Study</button>
    </>
} else if (pathname.includes("/decks")){
    deckButtons = <> 
    <Link to={`decks/${id}/edit`}>
        <button>Edit</button>
    </Link>
    <Link to={`decks/${id}/study`}>
        <button>Study</button>
    </Link> 
    <Link to={`decks/${id}/cards/new`}>
        <button>Add Cards</button>
    </Link>   
    </> 
}
        return (
            <div>
            <h2>{name}</h2>
            <p>{`${cardCount} cards`}</p>
            <p>{description}</p>
            {deckButtons}
            <DeleteDeck deckId={id} removeDeck={removeDeck} />
            </div>
            
        )
    

    
}

export default DeckView;