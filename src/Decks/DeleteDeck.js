import React from "react";
import {deleteDeck} from "../utils/api/index"
import {Link} from "react-router-dom"


function DeleteDeck ({deckId, removeDeck}) {
//updates data in API for permanant alteraction
//removeDeck updates state to avoid reloading page
    async function deleteDeckHandler() {
    if (window.confirm(`Do you really want to delete this deck? This action is permanant`)){
        removeDeck(deckId);
        await deleteDeck(deckId);
        console.log("Deleted: ", deckId);
        
     }        
    }
 
    return (

        <Link to="/">
        <button onClick={deleteDeckHandler}>Delete</button>
        </Link>
    )
}

export default DeleteDeck;