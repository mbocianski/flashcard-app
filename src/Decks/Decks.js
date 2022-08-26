import React from "react";
//import Deck from "./Deck";
//import { useState, useEffect } from "react";
import DeckView from "./DeckView";
import {Link} from "react-router-dom"
import Deck from "./Deck.js";

    

function Decks({decks, removeDeck, ids}){


//render list of decks using DeckView
// Passes removeDeck function
  function DeckList(){
    decks.map((deck, index) => {
    return(
      <div className="border border-solid" key={index}>
        <DeckView deck={deck} removeDeck={removeDeck} />
        </div>
      )
    });
  }

//message based on number of decks
  function CreateMessage() {
    let message = ""
    if (ids.length < 1){
     message = <h2>No decks exist. Click "Create Deck" to get started!</h2>
    }
    return message;
  }


    return (
    <div>
      <Link to="decks/new">
         <button>Create Deck</button>
      </Link>
      <DeckList />
      <CreateMessage />
    </div>
    )
}

export default Decks;