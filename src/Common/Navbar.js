import React from "react";
import {
  Switch,
  Link,
  Route,
  useParams
} from "react-router-dom";
//one common navbar that uses various paths to populate appropriate links and navigation
function NavBar({ deck=[] }) {
  const { deckId, cardId } = useParams();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Switch>
        <Route exact path="/decks/new">
          <p> / Create Deck</p>
        </Route>
        <Route exact path="/decks/:deckId">
          <p> / {deck.name} </p>
        </Route>
        <Route path={`/decks/:deckId/edit`}>
          <p> / </p>
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          <p> / edit</p>
        </Route>
        <Route path={`/decks/:deckId/cards/new`}>
          <p> / </p>
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          <p> / Add Card</p>
        </Route>
        <Route path={`/decks/:deckId/cards/:cardId/edit`}>
          <p> / </p>
          <Link to={`/decks/${deckId}`}>Deck: {deck.name}</Link>
          <p> / Edit Card {cardId}</p>
        </Route>
        <Route path={`/decks/:deckId/study`}>
          <p> / </p>
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          <p> / Study {cardId}</p>
        </Route>
      </Switch>
    </nav>
  );
}

export default NavBar;
