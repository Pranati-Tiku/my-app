
import React, { useState,useRef} from "react";
import Card from "../UI/Card";
import Button from "../UI/Buttons/Button";
import classes from "./AddUser.module.css";

const UpdateUser = (props) => {

  console.log("PROPS", props)
console.log("currentUSerData",props.currentUserData);
  const [isValid, setIsValid] = useState({
    touchFirstName: false,
    touchLastName: false,
    dateValid: true,
    touchPlace: false,
    phoneValid: true,
    touchAddress1: false,
    touchAddress2: false,
  });

  const [enteredFirstName, setEnteredFirstName] = useState(props.currentUserData ? props.currentUserData.firstName : "");
  const [enteredLastName, setEnteredLastName] = useState(props.currentUserData ? props.currentUserData.lastName : "");
  const [enteredDate, setEnteredDate] = useState(props.currentUserData ? props.currentUserData.dateOfBirth : "");
  const [enteredPlace, setEnteredPlace] = useState(props.currentUserData ? props.currentUserData.placeOfBirth : "")
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState(props.currentUserData ? props.currentUserData.phoneNumber : "")
  const [addressLine1, setAdressLine1] = useState(props.currentUserData ? props.currentUserData.addressLine1 : "");
  const [addressLine2, setAdressLine2] = useState(props.currentUserData ? props.currentUserData.addressLine2 : "");
  // const[image,setImage]=useState(null);
  const fileInputRef = useRef(null);
  
  const firstnameChangeHandler = (event) => {
    setIsValid((prevState) => ({ ...prevState, touchFirstName: true }));
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setIsValid((prevState) => ({ ...prevState, touchLastName: true }));
    setEnteredLastName(event.target.value);
  };
  const dateChangeHandler = (event) => {
    // setEnteredDate(event.target.value);
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setIsValid((prevState) => ({ ...prevState, dateValid: false }));
      setEnteredDate("");
    } else {
      let date = JSON.stringify(selectedDate);
      date = date.slice(1, 11);
      setEnteredDate(date);
      setIsValid((prevState) => ({ ...prevState, dateValid: true }));
    }
  };

  const phoneNumberChangeHandler = (event) => {
    const phoneValue = event.target.value;
    if (phoneValue.trim().length > 10) {
      setIsValid((prevState) => ({ ...prevState, phoneValid: false }));
      setEnteredPhoneNumber("");
    } else {
      setEnteredPhoneNumber(phoneValue);
      setIsValid((prevState) => ({ ...prevState, phoneValid: true }));
    }
  };

  const placeChangeHandler = (event) => {
    setIsValid((prevState) => ({ ...prevState, touchPlace: true }));

    setEnteredPlace(event.target.value);
  };

  const address1ChangeHandler = (event) => {
    setAdressLine1(event.target.value);
    setIsValid((prevState) => ({ ...prevState, touchAddress1: true }));
  }
  const address2ChangeHandler = (event) => {
    setAdressLine2(event.target.value);
    setIsValid((prevState) => ({ ...prevState, touchAddress2: true }));
  }

  const handleFileSelect = (event) => {
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result);
      const dataUrl = event.target.result;
      props.onFileSelect(dataUrl); 
    };
    reader.readAsDataURL(file);
    //  if (event.target.files && event.target.files[0]) {
    //   setImage(URL.createObjectURL(event.target.files[0]));
    // }
  };
  

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredFirstName.trim().length < 2 ||
      enteredLastName.trim().length < 2 ||
      +enteredPhoneNumber < 1 ||
      enteredPlace.trim().length < 2 ||
      addressLine1.trim().length < 2 ||
      addressLine2.trim().length < 2 ||
      enteredDate.trim().length < 2
    ) {
      return;
    }

    const userData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      dateOfBirth: enteredDate,
      placeOfBirth: enteredPlace,
      phoneNumber: +enteredPhoneNumber,
      addressLine1:addressLine1,
      addressLine2:addressLine2,
      id: props.currentUserData ? props.currentUserData.id : Math.random().toString(),
    };
    console.log(userData);

    if (props.isCreate) {
      props.onAddData(userData)
    } else {
      props.onupdateData(userData);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredDate("");
    setEnteredPlace("");
    setEnteredPhoneNumber("");
    setAdressLine1("");
    setAdressLine2("");
    setIsValid((prevState) => ({ ...prevState, touchFirstName: false }));
    setIsValid((prevState) => ({ ...prevState, touchLastName: false }));
    setIsValid((prevState) => ({ ...prevState, touchPlace: false }));
    setIsValid((prevState) => ({ ...prevState, touchAddress1: false }));
    setIsValid((prevState) => ({ ...prevState, touchAddress2: false }));
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={submitHandler}>
        <label htmlFor="firstname">First Name</label>
        <input
          id="firstname"
          type="text"
          value={enteredFirstName}
          onChange={firstnameChangeHandler}
        />
         {enteredFirstName.trim().length < 2 && isValid.touchFirstName && (
          <p style={{ color: "red" }}>Please enter proper firstname.</p>
        )}
        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
        />
       {enteredLastName.trim().length < 2 && isValid.touchLastName && (
          <p style={{ color: "red" }}>Please enter proper lastname.</p>
        )}
        <label htmlFor="birthdate">D.O.B</label>
        <input
          id="birthdate"
          type="date"
          value={enteredDate}
          onChange={dateChangeHandler}
        />
        {!isValid.dateValid && (
          <p style={{ color: "red" }}>Birth date cannot be in the future</p>
        )}
        <label>Address Line 1: </label>
        <textarea
          rows={5}
          cols={15}
          onChange={address1ChangeHandler}
          value={addressLine1}
        />
        {addressLine1.trim().length < 5 && isValid.touchAddress1 && (
          <p style={{ color: "red" }}>Length is short.</p>
        )}
        <label>Address Line 2: </label>
        <textarea
          rows={5}
          cols={15}
          onChange={address2ChangeHandler}
          value={addressLine2}
        />
         {addressLine2.trim().length < 5 && isValid.touchAddress2 && (
          <p style={{ color: "red" }}>Length is short.</p>
        )}
        <label>Place of Birth</label>
        <input type="text" value={enteredPlace} onChange={placeChangeHandler} />
        {enteredPlace.trim().length < 2 && isValid.touchPlace && (
          <p style={{ color: "red" }}>Length is short.Enter proper place.</p>
        )}

        <label htmlFor="phonenumber">Phone Number</label>
        <input
          id="phonenumber"
          type="number"
          onChange={phoneNumberChangeHandler}
          value={enteredPhoneNumber}
          className={classes["hide-number-arrow"]}
        />
       {!isValid.phoneValid && (
          <p style={{ color: "red" }}>Phone number cannot be more than 10.</p>
        )}
        <label htmlFor="profilephoto">Profile Picture</label>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          accept=".jpg,.png"
          onChange={handleFileSelect}
        />
        <Button type="submit">{props.isCreate ? "Add User" : "Update User"}</Button>
      </form>
    </Card>
  );
};
export default UpdateUser;
