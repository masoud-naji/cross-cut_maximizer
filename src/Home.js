import React, { useEffect, useState } from "react";
import Card from "./Components/UI/Card";
import AddUser from "./Components/User/AddUser";
import SearchUserList from "./Components/User/SearchUserList";
import classes from "./Components/User/AddUser.module.css";
import useFetch from "./Components/CustomHooks/useFetch";
import { useHistory } from "react-router";
import Chart from "./Chart/Chart";
import ShowWithAnimation from "./Components/CustomHooks/ShowWithDelay";
import heroimage from "./Images/Business_SVG.svg";
import SearchUserListEditable from "./Components/User/SearchUserListEditable";

const Home = (props) => {
  const history = useHistory();
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const url = "http://localhost:8000/AllUsers";
  const { data: usersList, isPending, error } = useFetch(url);
  const [isMounted, setIsMounted] = useState(false);

  ///////////////////just for trigger the Props.isChanging from AddUser Component too on App Component///////////
  const keyForRefetch = () => {
    props.isChanging(status);
  };

  useEffect(() => {
    setIsMounted(!isMounted);
  }, [props.showNewUser]);

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
        props.isChanging(status); /////////////just for tiger this prop on App Component
      })
      .catch((error) => {
        setErrorMessage(error);
        console.error("There was an error!", errorMessage);
      });
  };

  return (
    <div>
      {/* ////////////////////////change with Animation//////////////// */}

      <div className={classes.flex_container}>
        <div className={classes.flex_item_left}>
          <img src={heroimage} alt="Cross-CUT MAXimizer Image" />
        </div>
        <div className={classes.flex_item_right}>
          <Card className={`${classes.input} ${classes.hero}`}>
            {/* <button onClick={() => setIsMounted(!isMounted)}>Show/Hide</button> */}
            <ShowWithAnimation isMounted={!isMounted}>
              {usersList && <Chart data={usersList} />}
            </ShowWithAnimation>
            <ShowWithAnimation isMounted={isMounted}>
              <AddUser onClick={keyForRefetch} />
            </ShowWithAnimation>
          </Card>
        </div>
      </div>
      {/* ////////////////////////change without Animation//////////////// */}
      {/* {!props.showNewUser && usersList ? (
        <Chart data={usersList} />
      ) : (
        <AddUser onClick={keyForRefetch} />
      )} */}

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
        <div>
          {/* <SearchUserList Users={usersList} Ondelete={deleteHandler} /> */}
          <SearchUserListEditable
            Users={usersList}
            Ondelete={deleteHandler}
            onClick={keyForRefetch}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

//npx json-server --watch Post/db.json --port 8000
//npm install react-confirm-alert --save
