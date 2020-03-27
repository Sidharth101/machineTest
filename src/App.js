import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { Jumbotron, Container } from "react-bootstrap";
import Users from "./Users";

function App() {
  return (
    <div className="min-vh-100">
      <Jumbotron fluid>
        <Container>
          <Switch>
            <Route exact path="/" component={Users} />
          </Switch>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;
