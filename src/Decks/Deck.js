import React from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import DeckView from "./DeckView";
import { useEffect, useState } from "react";
import NotFound from "../Layout/NotFound";
import Cards from "../Cards/Cards";
import EditDeck from "./EditDeck";
import NavBar from "../Common/NavBar";
import CardForm from "../Cards/CardForm";
import EditCard from "../Cards/EditCard";
import StudyDeck from "./StudyDeck";
import Loading from "../Common/Loading";

function Deck({ ids, removeDeck, editDeck }) {
  //Sets state for deck
  const [deck, setDeck] = useState([]);

  // Set Loading state to render loading
  const [loaded, setLoaded] = useState(false);

  //gets deckId for routing below
  const { deckId } = useParams();

  //sets state for cards
  const [cards, setCards] = useState([]);

  //prop for adding cards to the deck
  const addCard = (cardToAdd) => {
    setCards([...cards, cardToAdd]);
  };

  //prop for updating a card in a deck
  const editCard = (cardToEdit) => {
    setCards(
      cards.map((card) => {
        if (cardToEdit.id === card.id) {
          return {
            ...card,
            front: cardToEdit.front,
            back: cardToEdit.back,
          };
        }
        return card;
      })
    );
  };

  //prop for deleting cards from deck
  const removeCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  //uses fetchData to return deck info using deckId (from params)
  useEffect(() => {
    setDeck([]);
    const controller = new AbortController();
    async function fetchData() {
      const data = await readDeck(deckId, controller.signal);
      setDeck(data);
      setCards(data.cards);
      setLoaded(true)
    }

    fetchData();

    return () => controller.abort();
  }, [deckId]);

  const blankCard = {
    front: "",
    back: "",
  };

  // used in routing below
  const { path } = useRouteMatch();

  if (!loaded) return <Loading />;

  //uses DeckView to render deck information if deck Id exist
  if (ids.includes(parseInt(deckId))) {
    return (
      <>
        <NavBar deck={deck} />
        <Switch>
          <Route exact path="/decks/:deckId">
            <DeckView deck={deck} removeDeck={removeDeck} />
            <h2>Cards</h2>
            <Cards deck={deck} removeCard={removeCard} />
          </Route>
          <Route path={`${path}/edit`}>
            <EditDeck deck={deck} editDeck={editDeck} />
          </Route>
          <Route exact path={`${path}/cards/new`}>
            <CardForm
              deck={deck}
              formFunction="new"
              addCard={addCard}
              card={blankCard}
            />
          </Route>
          <Route path={`${path}/cards/:cardId/edit`}>
            <EditCard deck={deck} editCard={editCard} />
          </Route>
          <Route path={`${path}/study`}>
            <StudyDeck deck={deck} />
          </Route>
        </Switch>
      </>
    );
  }

  return <NotFound />;
}

export default Deck;
