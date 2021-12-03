import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { LandingPage, FoodContent, Navbar } from "./Components";
import Prac from "./Components/Reusable-components/unusedComponents";

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [searchField, setSearchInput] = useState("");
  const [user, loading, error] = useAuthState(auth);

  console.log(loading, user, error);

  return (
    <>
      <Navbar />

      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <LandingPage
              {...props}
              searchField={searchField}
              setSearchInput={setSearchInput}
            />
          )}
        />

        <Route path="/orders" render={(props) => <FoodContent {...props} />} />
        <Route path="/pra" render={(props) => <Prac {...props} />} />
      </Switch>
    </>
  );
}

export default App;
