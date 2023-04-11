import React from "react";
import classes from './UserTable.module.css';
import DeleteButton from "../UI/Buttons/DeleteButton";
import UpdateButton from "../UI/Buttons/UpdateButton";

const UserTable = (props) => {
  return (
    <div className={classes['table-container']}>
      <table className={classes.table}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>D.O.B</th>
            <th>Address</th>
            <th>Place of Birth</th>
            <th>Phone Number</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Picture</th>
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
              <td>{props.profilePhotoDataUrl ? (<img src={props.profilePhotoDataUrl} alt="profile"  style={{ objectFit: 'cover',width:'100px',height:'100px' }}/>) : null}</td>
                {/* <td><img src={user.image} alt="" style={{ objectFit: 'cover',width:'100px',height:'100px' }}/></td> */}
             </tr>
            )
          })}
        </tbody>
      </table>
       </div>
      
  );
};
export default UserTable;
