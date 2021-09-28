import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const ReadOnlyRow = ({ user, isediting, Ondelete,rowEditing }) => {
  const submit = () => {
    confirmAlert({
      title: "Delte User",
      message: ` Are you sure to do delete  ${user.first_name} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => Ondelete(user.id),
        },
        {
          label: "No",
          onClick: () => console.log("no"),
        },
      ],
    });
  };

  return (
    <tr key={user.id}>
      <td>
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
          <Fragment>
            {/* <Button onClick={() => Ondelete(user.id)}>Delete</Button> */}
            <Button onClick={submit}>Delete</Button>
            <Button
              onClick={() => {
                rowEditing(user);
                // alert(`${user.first_name}  "Edit Button Clicked"`);
              }}
            >
              Edit
            </Button>
          </Fragment>
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
