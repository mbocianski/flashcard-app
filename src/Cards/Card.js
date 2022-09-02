import React from "react";
import DeleteCard from "./DeleteCard";
import { Link } from "react-router-dom";

//displays various properties of card. Edit button will take to edit url
// removeCard gets passed to delete button
function Card({ card: { id, front, back, deckId }, removeCard }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{front}</td>
            <td>{back}</td>
          </tr>
        </tbody>
      </table>
      <Link to={`/decks/${deckId}/cards/${id}/edit`}>
        <button>Edit</button>
      </Link>
      <DeleteCard removeCard={removeCard} cardId={id} />
    </div>
  );
}

export default Card;
