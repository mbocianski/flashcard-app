import React from "react";
import DeckForm from "./DeckForm";

function EditDeck({ deck, editDeck }) {
// simply provides editDeck function and edit prop to DeckForm 
  return (
    <>
      <DeckForm deck={deck} editDeck={editDeck} formFunction="edit" />
    </>
  );
}

export default EditDeck;
