import React from "react";
import DeckForm from "./DeckForm";
import NavBar from "../Common/NavBar";


function CreateDeck({addDeck}){

   

    const deck = {
        name: "",
        description: ""
    }

    return (
        <>
        <NavBar/>
        <DeckForm 
            deck={deck} 
            formFunction="create"
            addDeck={addDeck} />
        </>
    )

}
export default CreateDeck;