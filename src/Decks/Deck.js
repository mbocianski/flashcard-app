import React from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Switch, Route, Link, Path } from "react-router-dom";
import DeckView from "./DeckView";
import Navbar from "../Common/Navbar";
import { useEffect, useState } from "react";
import NotFound from "../Layout/NotFound";
import Cards from "../Cards/Cards";

//Sets state for deck
function Deck({ids}) {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
//uses fetchData to return deck info using deckId (from params)
  useEffect(() => {
    setDeck([]);
    const controller = new AbortController();
    async function fetchData() {
      const data = await readDeck(deckId, controller.signal);
      setDeck(data);
    }

    fetchData();

    return () => controller.abort();
  }, [deckId]);

//uses DeckView to render deck information if deck Id exist

if (ids.includes(parseInt(deckId))){
        return (
        <>
            <Navbar />
            <DeckView deck={deck} />
            <h2>Cards</h2>
            <Cards deck={deck} />
        </>
        );
    }

return <NotFound />
}

export default Deck;
