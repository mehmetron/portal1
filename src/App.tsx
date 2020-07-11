import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Lesson from "./components/Lesson";
import Save from "./components/Save";
import Dashboard from "./components/Dashboard";

// Resource where I learned tricks for reloading/rerendering site in browser on link click
// https://github.com/ReactTraining/react-router/issues/3109
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/kafka/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/kafka/lesson">Lesson #</Link>
            </li>
            <li>
              <Link to="/kafka/save">Save</Link>
            </li>
            <li>
              <Link to="/kafka/dashboard/save">Dashboard/Save</Link>
            </li>
            <li>
              <Link to="/kafka/about" target="_self">
                About! - throught Link with target
              </Link>
            </li>
            <li>
              <a href="/kafka/about">About! - through a tag</a>
            </li>
            <li>
              <a href="/kafka/about" target="_blank" rel="noopener noreferrer">
                <p>go to my server route, not a react route</p>
              </a>
            </li>
            <li>
              <a href="/kafka/about">
                <p>
                  go to my server route, not a react route -- took out target
                  and rel
                </p>
              </a>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/kafka/dashboard/save">
            <Save />
          </Route>
          <Route path="/kafka/dashboard">
            <Dashboard />
          </Route>
          <Route path="/kafka/lesson">
            <Lesson />
          </Route>
          <Route path="/kafka/save">
            <Save />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
