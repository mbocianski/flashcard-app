import React from "react";
import Navbar from "../Common/Navbar";
import {Switch, Route} from "react-router-dom"
import CreateDeckForm from "./CreateDeckForm";

function CreateDeck({addDeck}){

 return (
    <>
            <Navbar />
            <CreateDeckForm addDeck={addDeck} />
    </>
 );
};

export default CreateDeck;