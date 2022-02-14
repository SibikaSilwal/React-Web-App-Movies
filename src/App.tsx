import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
//import IndividualMovie from './movies/IndividualMovies';
import { landingPageDTO, movieDTO } from "./movies/movies.model";
import MoviesList from "./movies/MoviesList";
import Menu from "./Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./route-config";
import configureValidations from "./Validations";
import { claim } from "./Auth/auth.model";
import AuthenticationContext from "./Auth/AuthenticationContext";

configureValidations();

function App() {
  const [claims, setClaims] = useState<claim[]>([
    { name: "email", value: "ssilwal2@ramapo.edu" },
  ]);

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className="container">
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </div>
        <footer className="bd-footer py-5 mt-5 bg-light">
          <div className="container">
            Copyright @ Sibika Silwal {new Date().getFullYear().toString()}.
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
