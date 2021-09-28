import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const EditableOnlyRow = ({
  user,
  isediting,
  Ondelete,
  editFormChangeHandler,
  editFormData,
  onSave,
}) => {
  const submitDelete = () => {
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
          onClick: () =>{ return },
        },
      ],
    });
  };
  const submitSave = () => {
    confirmAlert({
      title: "Save User",
      message: ` Are you sure to do Save  ${user.first_name} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => onSave(),
        },
        {
          label: "No",
          onClick: () => { return },
        },
      ],
    });
  };
  return (
    <tr>
      <td />
      <td>
        <input
          value={editFormData.first_name}
          onChange={editFormChangeHandler}
          type="text"
          required="required"
          placeholder="first_name"
          name="first_name"
        />
      </td>
      <td>
        <input
          value={editFormData.last_name}
          onChange={editFormChangeHandler}
          type="text"
          required="required"
          placeholder="last_name"
          name="last_name"
        />
      </td>
      <td>
        <input
          value={editFormData.time}
          onChange={editFormChangeHandler}
          type="text"
          required="required"
          placeholder="time"
          name="time"
        />
      </td>
      <td>
        <input
          value={editFormData.email}
          onChange={editFormChangeHandler}
          type="email"
          required="required"
          placeholder="email"
          name="email"
        />
      </td>
      <td>
        <input
          value={editFormData.Job}
          onChange={editFormChangeHandler}
          type="text"
          required="required"
          placeholder="Job"
          name="Job"
        />
      </td>
      <td>
        <input
          value={editFormData.DateOfBirth}
          onChange={editFormChangeHandler}
          type="date"
          required="required"
          placeholder="DateOfBirth"
          name="DateOfBirth"
        />
      </td>
      <td>
        <input
          value={editFormData.donate}
          onChange={editFormChangeHandler}
          type="number"
          min="0"
          required="required"
          placeholder="donate"
          name="donate"
        />
      </td>
      <td>
        {isediting && (
          <Fragment>
            {/* <Button onClick={() => Ondelete(user.id)}>Delete</Button> */}
            <Button onClick={submitDelete}>Delete</Button>
            <Button onClick={submitSave}> Save</Button>
          </Fragment>
        )}
      </td>
    </tr>
  );
};

export default EditableOnlyRow;
