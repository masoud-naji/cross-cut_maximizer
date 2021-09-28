import React, { useEffect, useState } from "react";
// import UserData from "../Post/MOCK_DATA.json";
import style from "./UsersList.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

function SearchUserList(props) {
  const [isediting, setIsediting] = useState();
  const [name, setName] = useState("");
  const [foundUsers, setFoundUsers] = useState(props.Users);
  const [deletcontrol, setDeleteControl] = useState(false);

  // useEffect(() => {
  //   setFoundUsers(props.Users);
  //   console.log("useefect in search list run");
  //   console.log(deletcontrol);
  //   setDeleteControl(false);
  // }, [props.Users, deletcontrol]);

  // search by filter
  const filter = (event) => {
    const keyword = event.target.value;

    if (keyword !== "") {
      const results = props.Users.filter((user) => {
        return user.first_name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(props.Users);
      // If the text field is empty, show all users
    }
    setName(keyword);
  };

  // toggle edit table
  const enableEdit = () => {
    setIsediting(true);
  };
  const disableEdit = () => {
    setIsediting(false);
  };

  return (
    <Card className={style.users}>
      <div className={style.tableContainer}>
        {foundUsers && (
          <h3>
            Currently Table Contain {foundUsers.length} Records
            {/* <br /> Total Selected Debt is {getFormattedPrice(total)} */}
          </h3>
        )}
        <input
          type="search"
          value={name}
          id={style.myInput}
          onChange={filter}
          placeholder="Search for names.."
        />
         <table className={style.userTable}>
          <thead>
            <tr>
              <th>Avator</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Time</th>
              <th>Email</th>
              <th>JOB</th>
              <th>Birthday</th>
              <th>Donate</th>
              <th>
                {isediting ? (
                  <Button onClick={disableEdit}>Done</Button>
                ) : (
                  <Button onClick={enableEdit}>Edit</Button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {foundUsers && foundUsers.length > 0 ? (
              foundUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {" "}
                    <img src={user.Avator} alt={user.name}></img>
                  </td>
                  <td> {user.first_name}</td>
                  <td> {user.last_name}</td>
                  <td> {user.time}</td>
                  <td> {user.email}</td>
                  <td> {user.Job}</td>
                  <td>{user.DateOfBirth}</td>
                  <td>{user.donate} $</td>
                  <td>
                    {isediting && (
                      <Button
                        onClick={() => {
                          props.Ondelete(user.id);
                          console.log("SearchUserList delete click");
                         // setDeleteControl(true);
                        }}
                      >
                        Delete
                      </Button>
                      // <Button onClick={onDelteHandler}>Delete</Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <h1>No results found!</h1>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default SearchUserList;
