import React from "react";
import DeckForm from "./DeckForm";

function EditDeck({ editDeck }) {
// simply provides editDeck function and edit prop to DeckForm 
  return (
    <div>
      <DeckForm editDeck={editDeck} formFunction="edit" />
    </div>
  );
}

export default EditDeck;
