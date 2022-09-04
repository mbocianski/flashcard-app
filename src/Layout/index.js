import React from "react";
import Header from "./Header";
import Decks from "../Decks/Decks";
import { Switch, Route } from "react-router-dom";
import '../Common/index.css'

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <Decks />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
