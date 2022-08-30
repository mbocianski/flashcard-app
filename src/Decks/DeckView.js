import React from "react";
import DeleteDeck from "./DeleteDeck";
import { useLocation, Link } from "react-router-dom";

//extracts keys from each deck and builds them into an info card
function DeckView({ deck: { name, id, description, cards = [] }, removeDeck }) {
  const { pathname } = useLocation();
  const cardCount = cards.length;

  // shows view and study for home path
  let deckButtons;
  if (pathname === "/") {
    deckButtons = (
      <>
        <Link to={`decks/${id}`}>
          <button>View</button>
        </Link>
        <Link to={`/decks/${id}/study`}>
          <button>Study</button>
        </Link>
      </>
    );
    // shows edit, study, and add cards if viewing the deck itself
  } else if (pathname.includes("/decks")) {
    deckButtons = (
      <>
        <Link to={`${id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`${id}/study`}>
          <button>Study</button>
        </Link>
        <Link to={`${id}/cards/new`}>
          <button>Add Cards</button>
        </Link>
      </>
    );
  }
  return (
    <div>
      <h2>{name}</h2>
      <p>{`${cardCount} cards`}</p>
      <p>{description}</p>
      {deckButtons}
      <DeleteDeck deckId={id} removeDeck={removeDeck} />
    </div>
  );
}

export default DeckView;
