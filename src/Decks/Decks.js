import React from "react";
import { useState, useEffect } from "react";
import { Link, Route, Switch} from "react-router-dom";
import { listDecks } from "../utils/api/index";
import CreateDeck from "../Decks/CreateDeck";
import Deck from "../Decks/Deck";
import Loading from "../Common/Loading";
import DeckView from "./DeckView";
import NotFound from "../Layout/NotFound";

function Decks() {
  // Set Loading state to render loading
  const [loaded, setLoaded] = useState(false);

  //Set deck state
  const [decks, setDecks] = useState([]);

  //prop to pass down to delete DeleteDeck and Deck
  const removeDeck = (deckId) => {
    setDecks(decks.filter((deck) => deck.id !== deckId));
  };

  // add deck to list of decks
  const addDeck = (deckToAdd) => {
    setDecks([...decks, deckToAdd]);
  };

  //edit deck in list of decks
  const editDeck = (deckToEdit) => {
    setDecks(
      decks.map((deck) => {
        if (deckToEdit.id === deck.id) {
          return {
            ...deck,
            name: deckToEdit.name,
            description: deckToEdit.description,
          };
        }
        return deck;
      })
    );
  };

  //Pull in data via API call

  useEffect(() => {
    setDecks([]);
    const controller = new AbortController();

    async function fetchData() {
      const data = await listDecks(controller.signal);
      setDecks(data);
      setLoaded(true);
    }

    fetchData();

    return () => controller.abort();
  }, []);

  //grab deck ids
  const ids = decks.map((deck) => deck.id);

  //render list of decks using DeckView
  // Passes removeDeck function

  const deckList = decks.map((deck, index) => {
    return (
      <div className="border border-solid" key={index}>
        <DeckView deck={deck} removeDeck={removeDeck} />
      </div>
    );
  });

  //message based on number of decks
  function CreateMessage() {
     return <h2>No decks exist. Click "Create Deck" to get started!</h2>;
  }


    return (
      <Switch>
        <Route exact path="/">
        <Link to="/decks/new">
          <button>Create Deck</button>
        </Link>
          {!loaded ? <Loading /> : decks.length ? deckList : <CreateMessage/>}
        </Route>
        <Route path="/decks/new">
          <CreateDeck addDeck={addDeck} />
        </Route>
        <Route path="/decks/:deckId">
         {!loaded ? <Loading />  :<Deck ids={ids} editDeck={editDeck} removeDeck={removeDeck} /> }
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    );
   
}

export default Decks;
