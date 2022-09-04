import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "..//utils/api/index";
import StudyReader from "./StudyReader";
import Loading from "../Common/Loading";

function StudyDeck() {
  //grab deckId from params so function calls regardless of props passed
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);



 //set state for deck
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const data = await readDeck(deckId, controller.signal);
      setDeck(data);
    }

    fetchData();

    return () => controller.abort();
  }, [deckId]);
// Get card count from deck to determine which message below will display.
  let cardCount;
  !deck.cards ? (cardCount = 0) : (cardCount = deck.cards.length);


//Shows message not enough cards and prompt to add cards
function NotEnoughCards(){
  return (
    <div>
       <h2 className="py-2">{`Study: ${deck.name}`}</h2>
      <div className="border border-solid p-4">
        <h3>Not Enough Cards.</h3>
        <p>{`You need at least 3 cards to study. 
              There are ${cardCount} cards in this deck.`}</p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="btn btn-primary">Add Cards</button>
        </Link>
      </div>
    </div>
  );
}


//Deck with cards less than 3 will render NotEnoughCards and loading while cardCount renders
  if (cardCount < 3 && deck) {
    return(
    <div>
      {!deck ? <Loading /> : <NotEnoughCards />}
      </div>
    )
  }

  //If enough cards are available study screen will render
  return (
    <div>
      <h2 className="py-2">{`Study: ${deck.name}`}</h2>
      <div className="border border-solid p-4">
      {!deck ? <Loading /> :<StudyReader deck={deck} count={cardCount} />}
      </div>
    </div>
  );
}

export default StudyDeck;
