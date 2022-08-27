import React from "react";
import {deleteDeck} from "../utils/api/index"
import {useHistory} from "react-router-dom"


function DeleteDeck ({deckId, removeDeck}) {

let history=useHistory();    
//updates data in API for permanant alteraction
//removeDeck updates state to avoid reloading page
    async function deleteDeckHandler() {
    if (window.confirm(`Do you really want to delete this deck? This action is permanant`)){
        removeDeck(deckId);
        await deleteDeck(deckId);
        console.log("Deleted: ", deckId);
        history.push("/");
        
     }        
    }
 
    return (
        <button onClick={deleteDeckHandler}>Delete</button>
    )
}

export default DeleteDeck;