import React, { useState } from "react";
import UserTable from "./Components/Table/UserTable";
import classes from "./App.module.css";
import Updateuser from "./Components/User/UpdateUser";

function App() {
  const [profilePhotoDataUrl, setProfilePhotoDataUrl] = useState(null);
  const [users, setUsers] = useState([]);
  const [isCreate, setIsCreate] = useState(true);
  console.log("USERS", users)
  const [currentUserData, setCurrentUserData] = useState(null);

  const addUserHandler = (userData) => {
    // console.log(userData);
    setUsers((prevUsers) => {
      return [userData, ...prevUsers];
    });
  };

  const updateUserHandler = (updatedUserData) => {
    console.log(updatedUserData);
    const userIndex = users.findIndex(user => user.id === updatedUserData.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUserData;
    }
    setCurrentUserData(null)
    setIsCreate(prevState => !prevState)

  };
  const handleFileSelect = (dataUrl) => {
    console.log("DATAURL",dataUrl);
    setProfilePhotoDataUrl(dataUrl);

  };
  const updateClick = (id) => {
    const userToUpdate = users.find((item) => item.id === id);
    setCurrentUserData(userToUpdate);
    setIsCreate(false);
  };

  const deleteButtonHandler = (id) => {
    setUsers((prevState) => {
      const updatedUsers = prevState.filter((item) => item.id !== id);
      return updatedUsers;
    });
  };

  return (
    <div className={classes.App}>
      <section className={classes.section}>
        <Updateuser key={currentUserData?.id} onAddData={addUserHandler} onupdateData={updateUserHandler} currentUserData={currentUserData} isCreate={isCreate} onFileSelect={handleFileSelect}/>
      </section>
      <section className={classes.section}>
        <UserTable users={users} onDeleteButtonClick={deleteButtonHandler} onUpdateButtonClick={updateClick} profilePhotoDataUrl={profilePhotoDataUrl}/>
      </section>
    </div>
  );
}
export default App;
