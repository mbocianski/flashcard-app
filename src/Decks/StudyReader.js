import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyReader({ deck: { cards }, count }) {
  // card number for which cards to display  
  const [cardNumber, setCardNumber] = useState(1);
  // card front flips between true and false to render front or back
  const [cardFront, setCardFront] = useState(true);
  // for navigation
  const history = useHistory();

    // initialize display and buttons
  let cardDisplay;
  let buttons;

  // flips the card when flip button clicked
  const flipClickHandler = () => setCardFront(!cardFront);
  
  // will increment card number to display next card and switch front to true
  // once card number reached card length, end prompt displays
  const nextClickHandler = () => {
    if (cardNumber === cards.length) {
      endprompt();
    } else {
      setCardNumber(cardNumber + 1);
      setCardFront(!cardFront);
    }
  };

// okay will reset deck, cancel will take home
  function endprompt() {
    if (
      window.confirm(
        "Restart Cards? \r\n \r\nClick 'cancel' to return to home page."
      )
    ) {
      setCardNumber(1);
      setCardFront(!cardFront);
    } else {
      history.push("/");
    }
  }

  // use cardNumber - 1 since first array of index = 0
  // variable to display appropriate buttons and side of cards
  if (cardFront) {
    cardDisplay = cards[cardNumber - 1].front;
    buttons = (
      <div>
        <button className="btn btn-secondary" onClick={flipClickHandler}>Flip</button>
      </div>
    );
  }
  // use cardNumber - 1 since first array of index = 0
  if (!cardFront) {
    cardDisplay = cards[cardNumber - 1].back;
    buttons = (
      <div>
        <button className="btn btn-secondary" onClick={flipClickHandler}>Flip</button>
        <button className="btn btn-primary" onClick={nextClickHandler}>Next</button>
      </div>
    );
  }

  return (
    <div>
      <h3>{`Card ${cardNumber} of ${count}`}</h3>
      <p>{cardDisplay}</p>
      {buttons}
    </div>
  );
}

export default StudyReader;
