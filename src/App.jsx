import React from "react";

import CVDataProvider from "./components/providers/CVDataProvider";
import StyleProvider from "./components/providers/StyleProvider";
import AuthProvider from "./components/providers/AuthProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CVBuilderPage from "./pages/cv-builder";
import DeleteUser from "./pages/delete-user";
import Header from "./components/layout/header";

import ReactGA from "react-ga";
ReactGA.initialize("UA-44053651-1");
ReactGA.pageview(window.location.pathname + "cv-builder");

const App = () => {
  return (
    <>
      <StyleProvider>
        <AuthProvider>
          <CVDataProvider>
            <Header />
            <BrowserRouter>
              <Switch>
                <Route path="/delete-user">
                  <DeleteUser />
                </Route>
                <Route path="/">
                  <CVBuilderPage />
                </Route>
              </Switch>
            </BrowserRouter>
          </CVDataProvider>
        </AuthProvider>
      </StyleProvider>
    </>
  );
};

export default App;
