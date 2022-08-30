import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "..//utils/api/index";
import StudyReader from "./StudyReader";

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

//Deck with cards less than 3 will display not enough cards and prompt user to add some.
  if (cardCount < 3 || !cardCount) {
    return (
      <>
        <h2>{`Study: ${deck.name}`}</h2>
        <div className="border border-solid">
          <h3>Not Enough Cards.</h3>
          <p>{`You need at least 3 cards to study. 
                There are ${cardCount} cards in this deck.`}</p>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button>Add Cards</button>
          </Link>
        </div>
      </>
    );
  }

  //If enough cards are available study screen will render
  return (
    <>
      <h2>{`Study: ${deck.name}`}</h2>
      <div className="border border-solid">
        <StudyReader deck={deck} count={cardCount} />
      </div>
    </>
  );
}

export default StudyDeck;
