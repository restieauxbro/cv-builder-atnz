import React from "react";

import CVDataProvider from "./components/providers/CVDataProvider";
import StyleProvider from "./components/providers/StyleProvider";
import AuthProvider from "./components/providers/AuthProvider";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import CVBuilderPage from "./pages/cv-builder";
import DeleteUser from "./pages/delete-user";

const App = () => {
  return (
    <>
      <StyleProvider>
        <AuthProvider>
          <CVDataProvider>
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
