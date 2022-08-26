import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Decks/Decks";
import {useEffect, useState} from "react";
import {listDecks} from "../utils/api/index"
import {Switch, Route} from "react-router-dom"
import CreateDeck from "../Decks/CreateDeck";
import Deck from "../Decks/Deck";

function Layout() {
//Set deck state
  const [decks, setDecks] = useState([]);

//funciton to pass down to delete DeleteDeck and Deck
  const removeDeck = (deckId) => {
   setDecks(decks.filter((deck) => deck.id !== deckId));
  }

//function to add deck to list of decks 
const addDeck = (deckToAdd) => {
  setDecks(decks.push(deckToAdd));
}

//Pull in data via API call 

useEffect(() => {
    setDecks([]);
    const controller = new AbortController();

    async function fetchData() {
        const data = await listDecks(controller.signal)
        setDecks(data)};
    
    fetchData();
    
    return () => controller.abort();
},[])

//grab deck ids
const ids = decks.map((deck) => deck.id);


  return (
    <>
      <Header />
      <div className="container">
      <Switch>
        <Route exact path="/"> 
          <Decks 
            decks={decks} removeDeck={removeDeck} ids={ids}/>
        </Route>
        <Route path="/decks/new">
          <CreateDeck 
            decks={decks}
            addDeck={addDeck} />
        </Route>
        <Route path="/decks/:deckId">
          <Deck ids={ids} removeDeck={removeDeck} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </>
  );
}

export default Layout;
