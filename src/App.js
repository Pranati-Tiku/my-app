import React, { useState } from "react";
import UserTable from "./Components/Table/UserTable";
import classes from "./App.module.css";
import AddUser from "./Components/User/AddUser";
import Updateuser from './Components/User/UpdateUser'

function App() {
  const [users, setUsers] = useState([]);
  const [isCreate, setIsCreate] = useState(true);

  const [currentUserData, setCurrentUserData] = useState(null);

  const addUserHandler = (userData) => {
    console.log(userData);
    setUsers((prevUsers) => {
      return [userData, ...prevUsers];
    });
  };

  const updateUserHandler = (updatedUserData) => {

    const userIndex = users.findIndex(user => user.id === updatedUserData.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUserData;
    }
    setIsCreate(prevState => !prevState)

  };

  const updateClick = (id) => {
    const userToUpdate = users.find(item => item.id === id);
    setCurrentUserData(userToUpdate)
    setIsCreate(false)
  }



  const deleteButtonHandler = (id) => {
    setUsers((prevState) => {
      const updatedUsers = prevState.filter(item => item.id !== id);
      return updatedUsers;
    })
  }

  return (
    <div className={classes.App}>
      <section className={classes.section}>

        {isCreate ? <AddUser onAddData={addUserHandler} /> : <Updateuser onupdateData={updateUserHandler} userData={currentUserData} />}
      </section>
      <section className={classes.section}>
        <UserTable users={users} onDeleteButtonClick={deleteButtonHandler} onUpdateButtonClick={updateClick} />
      </section>
    </div>
  );
}
export default App;
