import React, { useState } from "react";
// import UserData from "../Post/MOCK_DATA.json";
import style from "./UsersList.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

function UserList(props) {
  const [isediting, setIsediting] = useState();

  const enableEdit = () => {
    setIsediting(true);
  };
  const disableEdit = () => {
    setIsediting(false);
  };

  return (
    <Card className={style.users}>
      <div>
       {PushSubscriptionOptions.users && <h3>Currently Table Contain {props.Users.length} Records</h3>} 
       
        <table className={style.userTable}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Age</th>
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
            {props.Users.map((user) => {
              return (
                <tr key={user.id}>
                  <td> {user.first_name}</td>
                  <td> {user.last_name}</td>
                  <td> {user.email}</td>
                  <td> {user.gender}</td>
                  <td>{user.DateOfBirth}</td>
                  <td>
                    {new Date().getFullYear() -
                      new Date(user.DateOfBirth).getFullYear()}
                  </td>
                  <td>
                    {isediting && (
                      <Button onClick={() => props.Ondelete(user.id)}>
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default UserList;
