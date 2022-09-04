import React from "react";
import DeleteCard from "./DeleteCard";
import { Link } from "react-router-dom";

//displays various properties of card. Edit button will take to edit url
// removeCard gets passed to delete button
function Card({ card: { id, front, back, deckId }, removeCard }) {
  return (
    <div className="py-1">
      <div className="row py-2 d-flex justify-content-center">
        <div className="col-6">{front}</div>
        <div className="col-6">{back}</div>
      </div>
      <div className="row py-2">
        <div className="col-8"></div>
        <div className="col-4 d-flex flex-row">
          <Link to={`/decks/${deckId}/cards/${id}/edit`}>
            <button className="btn btn-secondary">Edit</button>
          </Link>
          <DeleteCard removeCard={removeCard} cardId={id} />
        </div>
      </div>
    </div>
  );
}

export default Card;
