import React from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import DeckView from "./DeckView";
import Navbar from "../Common/Navbar";
import { useEffect, useState } from "react";
import NotFound from "../Layout/NotFound";
import Cards from "../Cards/Cards";
import EditDeck from "./EditDeck";



function Deck({ids, removeDeck, editDeck}) {

  //Sets state for deck
  const [deck, setDeck] = useState([]);

  //gets deckId for routing below
  const { deckId } = useParams();

  //sets state for cards
  const [cards, setCards] = useState([]);

  //prop for adding cards to the deck
  const addCard = (cardToAdd) => {
    setCards([...cards, cardToAdd])
  }

  //prop for deleting cards from deck
  const removeCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  }

  console.log("Cards: ", cards);

  //uses fetchData to return deck info using deckId (from params)
    useEffect(() => {
      setDeck([]);
      const controller = new AbortController();
      async function fetchData() {
        const data = await readDeck(deckId, controller.signal);
        setDeck(data);
        setCards(data.cards);
      }

      fetchData();

      return () => controller.abort();
    },[]);

    // for routing
    const match = useRouteMatch();

//uses DeckView to render deck information if deck Id exist
if (ids.includes(parseInt(deckId))){
        return (
        <>
            <Navbar />
            <Switch>
              <Route exact path={match.path}>
                <DeckView deck={deck} removeDeck={removeDeck} />
                <h2>Cards</h2>
                <Cards deck={deck} removeCard={removeCard} />
              </Route>
              <Route path={`${match.path}/edit`}>
              <EditDeck
                  deck={deck}
                  editDeck={editDeck} />
              </Route>
            </Switch>
        </>
        );
    }

return <NotFound />
}

export default Deck;
