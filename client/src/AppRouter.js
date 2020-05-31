import React from "react";
import Authentication from "./components/Authentication";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Authentication} />
      </div>
    </Router>
  );
};
