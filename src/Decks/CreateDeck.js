import React from "react";
import Navbar from "../Common/Navbar";
import {Switch, Route} from "react-router-dom"
import CreateDeckForm from "./CreateDeckForm";

function CreateDeck({decks, addDeck}){

 return (
    <>
            <Navbar />
            <CreateDeckForm 
                decks={decks}
                addDeck={addDeck} />
    </>
 );
};

export default CreateDeck;