import React from "react";
import DeckForm from "./DeckForm";


function CreateDeck({addDeck}){

    const deck = {
        name: "",
        description: ""
    }

    return (
        <>
        <DeckForm 
            deck={deck} 
            formFunction="create"
            addDeck={addDeck} />
        </>
    )

}
export default CreateDeck;