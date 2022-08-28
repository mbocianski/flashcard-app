import React from "react";
import DeckForm from "./DeckForm";

function EditDeck({deck, editDeck}) {

    return (
        <>
        <DeckForm 
            deck={deck} 
            editDeck={editDeck}
            formFunction="edit" />
        </>
    )

}

export default EditDeck;