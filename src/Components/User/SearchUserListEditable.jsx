import React, { useEffect, useState } from "react";
import MyAvator from "../CustomHooks/MyAvator";
import style from "./UsersList.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { Fragment } from "react";
import ReadOnlyRow from "./UserEdit/ReadOnlyRow";
import EditableOnlyRow from "./UserEdit/EditableRow";
import Pagination from "../UI/pagination";
import Paginate from "../CustomHooks/Paginate";

function SearchUserListEditable(props) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000/AllUsers";
  const [isediting, setIsediting] = useState();
  const [name, setName] = useState("");
  const [foundUsers, setFoundUsers] = useState(props.Users);
  const [rowEditing, setRowEditing] = useState(null);
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedFilteredUsers = Paginate(foundUsers, currentPage, pageSize);
  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    time: "",
    email: "",
    Job: "",
    DateOfBirth: "",
    donate: "",
  });
  /////////////////////////////////////////////////Edit Rows////////////////////////////////////
  const editFormChangeHandler = (event) => {
    const filedName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[filedName] = fieldValue;
    setEditFormData(newFormData);
  };

  const editFormHandler = (editFormData) => {
    setRowEditing(editFormData.id);

    const formValues = {
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      time: editFormData.time,
      email: editFormData.email,
      Job: editFormData.Job,
      DateOfBirth: editFormData.DateOfBirth,
      donate: editFormData.donate,
    };
    setEditFormData(formValues);
  };

  const editFormSubmit = (user) => {
    const Avator = MyAvator(
      `${editFormData.first_name.charAt(0)}${editFormData.last_name.charAt(0)}`,
      `${"#" + (((1 << 24) * Math.random()) | 0).toString(16)}`,
      `${"#" + (((1 << 24) * Math.random()) | 0).toString(16)}`
    );
    setIsPending(true);

    const editUser = {
      Avator,
      id: rowEditing,
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      time: editFormData.time,
      email: editFormData.email,
      Job: editFormData.Job,
      DateOfBirth: editFormData.DateOfBirth,
      donate: editFormData.donate,
    };

    fetch(url + "/" + editUser.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser),
    })
      .then(() => {
        setIsPending(false);
        setData(data);
        setError(null);
        setRowEditing(null);
        props.onClick();
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
    console.log(`"eror is " ${error}`);
  };
  /////////////////////////////////////////////// End of Edit Rows///////////////////////////////////////////////
  //////////////////////////////////////////// search by filter//////////////////////////////////////////////////
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

  ///////////////////////////////////toggle edit table//////////////////////////////////////////////////////
  const enableEdit = () => {
    setIsediting(true);
  };
  const disableEdit = () => {
    setIsediting(false);
  };
  ////////////////////////////////////Pagination////////////////////////////////////////////////////////////
  const PageChangeHandler = (page) => {
    setCurrentPage(page);
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
        <div className={style.toptable}>
        <input
          type="search"
          value={name}
          id={style.myInput}
          onChange={filter}
            placeholder="Search for names.."
            className={style.toptable_left}
        />
             <Pagination
            itemsCount={foundUsers.length}
            pageSize={pageSize}
            onPageChange={PageChangeHandler}
            currentPage={currentPage}
            className={style.toptable_right}
          />
          </div>
        <form>
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
                paginatedFilteredUsers.map((user) =>
                  rowEditing === user.id ? (
                    <Fragment>
                      <EditableOnlyRow
                        user={user}
                        isediting={isediting}
                        Ondelete={props.Ondelete}
                        editFormData={editFormData}
                        editFormChangeHandler={editFormChangeHandler}
                        onSave={editFormSubmit}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <ReadOnlyRow
                        user={user}
                        isediting={isediting}
                        rowEditing={editFormHandler}
                        Ondelete={props.Ondelete}
                      />
                    </Fragment>
                  )
                )
              ) : (
                <h3>No results found!</h3>
              )}
            </tbody>
          </table>
     
        </form>
      </div>
    </Card>
  );
}

export default SearchUserListEditable;
