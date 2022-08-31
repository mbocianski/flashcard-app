import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Decks/Decks";
import { Switch, Route } from "react-router-dom";

function Layout() {
  
//sets up initial display of decks, header, and not found
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <Decks/>
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
