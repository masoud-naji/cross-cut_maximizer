import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chart from "./Chart/Chart";
import Navbar from "./Components/UI/Navbar";
import NotFound from "./Components/UI/NotFound";
import Home from "./Home";

// import UserList from "./Components/User/UserList";
// import UserData from "./Components/Post/MOCK_DATA.json";

function App() {
  const [userlistChange, setUserlistChange] = useState(false); //if new useradded refetch
  const [formshow, setFormShow] = useState(false); //new user toggle form

  useEffect(() => {
    console.log("UseEefect APP run");
    setUserlistChange(false);
  });

  const userFormHandler = () => {
    setFormShow(!formshow);
  };

  const isChangingCLick = (status) => {
    console.log(status);
    console.log("ok in app");
    setUserlistChange(true);
  };

  return (
    <Router>
      <div>
        <Navbar onShowForm={userFormHandler} />
        <div>
          <Switch>
            <Route exact path="/">
              {!userlistChange && <Home showNewUser={formshow} isChanging={isChangingCLick} />}
            </Route>
            <Route path="/Chart">
              <Chart />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

//npx json-server --watch Post/db.json --port 8000
