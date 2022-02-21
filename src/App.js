import React from "react";
import "./App.css";
import Konferencija from "./pages/Konferencija";
import ApplicationHeader from "./components/ApplicationHeader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Page } from "./components/BasicStyledComponents";
import styled from "styled-components";
import KonferencijaSesije from "./pages/KonferencijaSesije";
import SesijaDogadjaji from "./pages/SesijaDogadjaji";
import LogIn from "./pages/LogIn";
import { useAuth0 } from "@auth0/auth0-react";

const AppContent = styled.div`
  display: flex;
  height: 100%;
`;

const App = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <LogIn />;
  }

  return (
    <BrowserRouter>
      <Page>
        <ApplicationHeader />
        <AppContent>
          <Switch>
            <Route exact path={"/konferencije"}>
              <Konferencija />
            </Route>
            <Route
              exact
              path="/konferencije/:id/sesije"
              component={KonferencijaSesije}
            />
            <Route
              exact
              path="/konferencije/:id1/sesije/:id2/dogadjaji"
              component={SesijaDogadjaji}
            />
            <Route exact path={"/"}>
              <LogIn />
            </Route>
          </Switch>
        </AppContent>
      </Page>
    </BrowserRouter>
  );
};

export default App;
