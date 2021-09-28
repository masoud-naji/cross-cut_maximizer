import React, { useState } from "react";
// import Card from "../UI/Card";
// import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import MyAvator from "../CustomHooks/MyAvator";

const AddUser = (props) => {
  // const [avatatIMG, setAvatarIMG] = useState(avatar);
  const [isPending, setIsPending] = useState(false);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [Job, setJob] = useState("");
  const [DateOfBirth, setDateofBirth] = useState("");
  const [donate, setDonate] = useState("");

  const first_nameChangeHandler = (event) => {
    setfirst_name(event.target.value);
  };
  const last_nameChangeHandler = (event) => {
    setlast_name(event.target.value);
  };
  const EmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const JobChangeHandler = (event) => {
    setJob(event.target.value);
  };
  const DateofBirthChangeHandler = (event) => {
    setDateofBirth(event.target.value);
  };
  const DonateChangeHandler = (event) => {
    setDonate(event.target.value);
  };
/////////////////////////////////////////////////Add User ////////////////////////////////////
  const submitHandler = (event) => {
    event.preventDefault();

    //Make avatar from first and last name
    const Avator = MyAvator(
      `${first_name.charAt(0)}${last_name.charAt(0)}`,
      `${"#" + (((1 << 24) * Math.random()) | 0).toString(16)}`,
      `${"#" + (((1 << 24) * Math.random()) | 0).toString(16)}`
    );

    setIsPending(true);
    // const myid = Math.random(1 * 100); json server gonna add id automaticaly
    const userTableData = {
      Avator,
      first_name,
      last_name,
      email,
      Job,
      DateOfBirth,
      donate,
    };
    console.log(userTableData);
    fetch("http://localhost:8000/AllUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userTableData),
    }).then(() => {
      setIsPending(false);
      /////////////just for tiger this prop on Home And Then App Component
      props.onClick();
      setfirst_name("");
      setlast_name("");
      setEmail("");
      setJob("");
      setDateofBirth("");
      setDonate("");
      // props.isAdded("added");
    });
  };
/////////////////////////////////////////////////END of Add User////////////////////////////////////
  return (
    // <Card className={classes.input}>
    <form onSubmit={submitHandler}>
      <label htmlFor="first_name">first_name</label>
      <input
        required
        value={first_name}
        onChange={first_nameChangeHandler}
        id="first_name"
        type="text"
      />
      <label htmlFor="last_name">last_name</label>
      <input
        required
        value={last_name}
        onChange={last_nameChangeHandler}
        id="last_name"
        type="text"
      />
      <label htmlFor="Email">Email</label>
      <input
        required
        value={email}
        onChange={EmailChangeHandler}
        id="Email"
        type="text"
      />
      <label htmlFor="Job">Job</label>
      <input
        required
        value={Job}
        onChange={JobChangeHandler}
        id="Job"
        type="text"
      />
      <label htmlFor="Donate">Donate</label>
      <input
        value={donate}
        onChange={DonateChangeHandler}
        id="Donate"
        type="number"
        min="0"
      />
      <label htmlFor="DateofBirth">Date of Birth</label>
      <input
        required
        value={DateOfBirth}
        onChange={DateofBirthChangeHandler}
        id="DateofBirth"
        type="date"
      />
      {!isPending && <Button type="submit"> Add User </Button>}
      {isPending && (
        <Button disabled type="submit">
          ...Adding
        </Button>
      )}
    </form>
    // </Card>
  );
};

export default AddUser;
