import React from "react";
import { deleteCard } from "../utils/api/index";
import { useHistory, useLocation } from "react-router-dom";

function DeleteCard({ removeCard, cardId }) {
  let history = useHistory();
  const { pathname } = useLocation();

  //Updates Api and State for the card
  const deleteCardHandler = async () => {
    if (
      window.confirm(
        "Do you really want to delete this card? This action is permanant."
      )
    ) {
      removeCard(cardId);
      await deleteCard(cardId);
      console.log("Deleted Card # ", cardId);
    }
    history.go(pathname);
  };

  return <button className="btn btn-danger" onClick={deleteCardHandler}>Delete</button>;
}

export default DeleteCard;
