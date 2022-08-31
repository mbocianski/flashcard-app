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

// Set Loading state to render loading
const [loaded, setLoaded] = useState(false);


//Set deck state
  const [decks, setDecks] = useState([]);

//prop to pass down to delete DeleteDeck and Deck
  const removeDeck = (deckId) => {
   setDecks(decks.filter((deck) => deck.id !== deckId));
  }
  

// add deck to list of decks 
const addDeck = (deckToAdd) => {
  setDecks([...decks, deckToAdd])
}

//edit deck in list of decks
const editDeck = (deckToEdit) => {
  setDecks(decks.map((deck) => {
    if (deckToEdit.id === deck.id){
        return { 
        ...deck, 
        name: deckToEdit.name, 
        description: deckToEdit.description 
      };
    } return deck;
  }));
};

//Pull in data via API call 

useEffect(() => {
    setDecks([]);
    const controller = new AbortController();

    async function fetchData() {
        const data = await listDecks(controller.signal)
        setDecks(data)};
        setLoaded(true)
    
    fetchData();
    
    return () => controller.abort();
},[])

console.log("deck state: ", decks);

//grab deck ids
const ids = decks.map((deck) => deck.id);

if (!loaded){
return (
  <>
    <Header />
  <h2>Loading...</h2>
  </>
)
}

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
          <CreateDeck addDeck={addDeck} />
        </Route>
        <Route path="/decks/:deckId">
          <Deck ids={ids} editDeck={editDeck} removeDeck={removeDeck} />
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
