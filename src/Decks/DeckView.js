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
      <div className="">
        <Link to={`decks/${id}`}>
          <button className="btn btn-secondary mr-2">View</button>
        </Link>
        <Link to={`/decks/${id}/study`}>
          <button className="btn btn-primary">Study</button>
        </Link>
      </div>
    );
    // shows edit, study, and add cards if viewing the deck itself
  } else if (pathname.includes("/decks")) {
    deckButtons = (
      <div className="">
        <Link to={`${id}/edit`}>
          <button className="btn btn-secondary mr-2">Edit</button>
        </Link>
        <Link to={`${id}/study`}>
          <button className="btn btn-primary mr-2">Study</button>
        </Link>
        <Link to={`${id}/cards/new`}>
          <button className="btn btn-primary">Add Cards</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="pl-5 py-4 pr-3">
      <div className="row">
        <div className="col-9">
         <h3>{name}</h3>
        </div>
        <div className="col-3">
          <p>{`${cardCount} cards`}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>{description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-9">
          {deckButtons}
        </div>
        <div className="col-3">
          <DeleteDeck deckId={id} removeDeck={removeDeck} />
        </div>
      </div>
    </div>
  );
}

export default DeckView;
