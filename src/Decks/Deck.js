import React from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Switch, Route } from "react-router-dom";
import DeckView from "./DeckView";
import { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import NavBar from "../Common/NavBar";
import CardForm from "../Cards/CardForm";
import EditCard from "../Cards/EditCard";
import StudyDeck from "./StudyDeck";
import Loading from "../Common/Loading";
import DeckForm from "./DeckForm";

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
    console.log("addCard", cardToAdd);
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
      setLoaded(true);
    }

    fetchData();

    return () => controller.abort();
  }, [deckId]);

  const blankCard = {
    front: "",
    back: "",
  };

  // if (!loaded) return <Loading />;

  //uses DeckView to render deck information if deck Id exist
  // if (ids.includes(parseInt(deckId))) {
  return (
    <div className="">
      <Switch>
        <Route exact path="/decks/:deckId">
          <NavBar deck={deck} />
          {!loaded ? (
            <Loading />
          ) : (
            <DeckView deck={deck} removeDeck={removeDeck} />
          )}
          <h2 className="px-5">Cards</h2>
          <div className="px-5">
            <Cards cards={cards} removeCard={removeCard} />
          </div>
        </Route>
        <Route path={"/decks/:deckId/edit"}>
          <DeckForm deck={deck} editDeck={editDeck} formFunction="edit" />
        </Route>
        <Route exact path={"/decks/:deckId/cards/new"}>
          <NavBar deck={deck} />
          <h3><span>{`${deck.name}: `}</span><span></span>Add Card</h3>
          <CardForm formFunction="new" addCard={addCard} card={blankCard} />
        </Route>
        <Route path={"/decks/:deckId/cards/:cardId/edit"}>
          <NavBar deck={deck} />
          <EditCard editCard={editCard} />
        </Route>
        <Route path={"/decks/:deckId/study"}>
          <NavBar deck={deck} />
          <div className="px-5">
          <StudyDeck deck={deck} />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

// return <NotFound />;
// }

export default Deck;
