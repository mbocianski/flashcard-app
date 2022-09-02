import React from "react";
import DeckForm from "./DeckForm";

function CreateDeck({ addDeck }) {


    return (
        <div>
        <DeckForm 
            formFunction="create"
            addDeck={addDeck} />
        </div>
    )

}
export default CreateDeck;
