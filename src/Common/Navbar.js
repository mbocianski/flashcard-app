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
    <nav className="rounded-pill nav navbar-expand-lg navbar-dark bg-dark text-light mb-5 px-5 pt-3 pb-1 align-items-center">
      <Link to="/"><p><span>Home</span></p></Link>
      <Switch>
        <Route exact path="/decks/new">
          <p><span>/</span><span>Create Deck</span></p>
        </Route>
        <Route exact path="/decks/:deckId">
          <p><span>/</span><span>{deck.name}</span></p>
        </Route>
        <Route path={`/decks/:deckId/edit`}>
          <p><span>/</span></p>
          <Link to={`/decks/${deckId}`}><p><span>{deck.name}</span></p></Link>
          <p><span>/</span><span>Edit</span></p>
        </Route>
        <Route path={`/decks/:deckId/cards/new`}>
        <p><span>/</span></p>
          <Link to={`/decks/${deckId}`}><p><span>{deck.name}</span></p></Link>
          <p><span>/</span><span>Add Card</span></p>
        </Route>
        <Route path={`/decks/:deckId/cards/:cardId/edit`}>
        <p><span>/</span></p>
          <Link to={`/decks/${deckId}`}><p>Deck: {deck.name}</p></Link>
          <p><span>/</span><span>Edit Card {cardId}</span></p>
        </Route>
        <Route path={`/decks/:deckId/study`}>
          <p><span>/</span></p>
          <Link to={`/decks/${deckId}`}><p>{deck.name}</p></Link>
          <p><span>/</span><span>Study {cardId}</span></p>
        </Route>
      </Switch>
    </nav>
  );
}

export default NavBar;
