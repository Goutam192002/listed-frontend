import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NewList from "./new";
import React from "react";
import ListDetail from "./list_detail";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  <Redirect to="/new" />
              </Route>
              <Route path="/new">
                  <NewList />
              </Route>
              <Route path="/lists/:id">
                  <ListDetail />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
