import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Decks/Decks";
import CreateDeck from "../Decks/CreateDeck";
import {useEffect, useState} from "react";
import {listDecks} from "../utils/api/index"


function Layout() {

  const [decks, setDecks] = useState([]);
  const removeDeck = (deckId) => {
   setDecks(decks.filter((deck) => deck.id !== deckId));
  }

  

useEffect (() => {
    setDecks([]);
    const controller = new AbortController();

    async function fetchData() {
        const data = await listDecks(controller.signal)
        setDecks(data)};
    
    fetchData();
    
    return () => controller.abort();
},[])





  return (
    <>
      <Header />
      <div className="container">
        <CreateDeck />
        <Decks decks={decks} removeDeck={removeDeck}/>
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
