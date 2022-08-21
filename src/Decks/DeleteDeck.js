import React from "react";
import {deleteDeck} from "../utils/api/index"


function DeleteDeck ({deckId, removeDeck}) {

    async function deleteDeckHandler() {
    if (window.confirm(`Do you really want to delete deck ${deckId}? This action is permanant`)){
        removeDeck(deckId);
        await deleteDeck(deckId);
        console.log("Deleted: ", deckId);
        
     }        
    }
 
    return (
        <button onClick={deleteDeckHandler}>Delete</button>
    )
}

export default DeleteDeck;