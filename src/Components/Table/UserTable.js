import React from "react";
import classes from './UserTable.module.css';
import Card from "../UI/Card";
import DeleteButton from "../UI/Buttons/DeleteButton";
import UpdateButton from "../UI/Buttons/UpdateButton";

const UserTable = (props) => {
  return (
    <Card className={classes.table}>
<div className={classes['table-responsive']}>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>D.O.B</th>
            <th>Address</th>
            <th>Place of Birth</th>
            <th>Phone Number</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {props.users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.addressLine1},{user.addressLine2}</td>
                <td>{user.placeOfBirth}</td>
                <td>{user.phoneNumber}</td>
                <td><UpdateButton id={user.id} updateItem={props.onUpdateButtonClick}>Update</UpdateButton></td>
                <td><DeleteButton id={user.id} deleteItem={props.onDeleteButtonClick}>Delete</DeleteButton></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </Card>
  );
};
export default UserTable;
