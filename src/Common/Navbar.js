import React from "react";
import { Switch, Link, Route, useParams, useRouteMatch } from "react-router-dom";


function NavBar ({deck}){

    const {path} = useRouteMatch();
    const params = useParams();
    const {deckId, cardId} = useParams();

console.log ("card ID: ", params)


        return(
            <nav>
            <Link to="/">Home</Link>
            <Switch>
                <Route path="/decks/new">
                    <p> / Create Deck</p>
                </Route>
                <Route exact path="/decks/:deckId">
                    <p> / {deck.name} </p>  
                </Route>
                <Route path={`${path}/edit`}>
                        <p> / </p>
                        <Link to ={`/decks/${deckId}`}>{deck.name}</Link>
                        <p> / edit</p>
                </Route>
                <Route path={`${path}/cards/new`}>
                    <p> / </p>
                    <Link to ={`/decks/${deckId}`}>{deck.name}</Link>
                    <p> / Add Card</p>
                </Route>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <p> / </p>
                    <Link to ={`/decks/${deckId}`}>Deck: {deck.name}</Link>
                    <p> / Edit Card {cardId}</p>
                </Route>
                
            </Switch>
            </nav>
        )
    }


export default NavBar;