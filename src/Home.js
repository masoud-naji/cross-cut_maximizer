import React, { useEffect, useState } from "react";
import Card from "./Components/UI/Card";
import AddUser from "./Components/User/AddUser";
import SearchUserList from "./Components/User/SearchUserList";
import classes from "./Components/User/AddUser.module.css";
import useFetch from "./Components/CustomHooks/useFetch";
import { useHistory } from "react-router";

// import UserList from "./Components/User/UserList";
// import UserData from "./Components/Post/MOCK_DATA.json";

const Home = (props) => {
  const history = useHistory();
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const url = "http://localhost:8000/AllUsers";
  const { data: usersList, isPending, error } = useFetch(url);
  const deleteHandler = (id) => {
    fetch(url + "/" + id, { method: "DELETE" })
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        setStatus("Delete successful");
        props.isChanging(status);
      })
      .catch((error) => {
        setErrorMessage(error);
        console.error("There was an error!", errorMessage);
      });
  };

  return (
    <div>
      {props.showNewUser ? <AddUser /> : <h2></h2>}

      {error && (
        <Card className={classes.input}>
          <h2>{error}</h2>
        </Card>
      )}
      {isPending && (
        <Card className={classes.input}>
          <h2>... Loading</h2>
        </Card>
      )}
      {usersList && (
        <SearchUserList Users={usersList} Ondelete={deleteHandler} />
      )}
      {/* {usersList && <UserList Users={usersList} Ondelete={deleteHandler} />} */}
    </div>
  );
};

export default Home;

//npx json-server --watch Post/db.json --port 8000
