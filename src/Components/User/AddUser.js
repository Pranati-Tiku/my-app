import React, { useRef, useState, useReducer } from "react";
import Card from "../UI/Card";
import Button from "../UI/Buttons/Button";
import classes from "./AddUser.module.css";

const addressReducer = (state, action) => {
  if (action.type === "ADD_ADDRESS1") {
    return { addressLine1: action.val, addressLine2: state.addressLine2 };
  }
  if (action.type === "ADD_ADDRESS2") {
    return { addressLine1: state.addressLine1, addressLine2: action.val };
  }
  if (action.type === "RESET") {
    return { addressLine1: "", addressLine2: "" };
  }
  return { addressLine1: "", addressLine2: "" };
};

const AddUser = (props) => {
  const fileInputRef = useRef(null);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [touchFirstName, setTouchFirstName] = useState(false);
  const [touchLastName, setTouchLastName] = useState(false);
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [dateValid, setDateValid] = useState(true);
  const [enteredPlace, setEnteredPlace] = useState("");
  const[touchplace,setTouchPlace]=useState(false);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [phoneValid, phoneIsValid] = useState(true);
  const [addressState, dispatchAddress] = useReducer(addressReducer, {
    addressLine1: "",
    addressLine2: "",
  });
  const reset = () => dispatchAddress({ type: "RESET" });

  const firstnameChangeHandler = (event) => {
    setTouchFirstName(true);
    setEnteredFirstName(event.target.value);
  };

  const LastNameChangeHandler = (event) => {
    setTouchLastName(true);
    setEnteredLastName(event.target.value);
  };

  const dateChangeHandler = (event) => {
    // setEnteredDate(event.target.value);
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      setDateValid(false);
      setEnteredDate("");
    } else {
      let date = JSON.stringify(selectedDate);
      date = date.slice(1, 11);
      setEnteredDate(date);
      setDateValid(true);
    }
  };

  const phoneNumberChangeHandler = (event) => {
    const phoneValue = event.target.value;
    if (phoneValue.trim().length > 10) {
      phoneIsValid(false);
      setEnteredPhoneNumber("");
    } else {
      setEnteredPhoneNumber(phoneValue);
      phoneIsValid(true);
    }
  };

  const placeChangeHandler = (event) => {
    setTouchPlace(true);
    setEnteredPlace(event.target.value);
  };

  const address1ChangeHandler = (event) => {
    dispatchAddress({ type: "ADD_ADDRESS1", val: event.target.value });
  };

  const address2ChangeHandler = (event) => {
    dispatchAddress({ type: "ADD_ADDRESS2", val: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredFirstName.trim().length < 2 ||
      enteredLastName.trim().length < 2 ||
      +enteredPhoneNumber < 1 ||
      enteredPlace.trim().length < 2 ||
      addressState.addressLine1.trim().length < 2 ||
      addressState.addressLine2.trim().length < 2 ||
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
      addressLine1: addressState.addressLine1,
      addressLine2: addressState.addressLine2,
      id: Math.random().toString(),
    };
    // console.log(enteredDate);
    console.log(userData);
    props.onAddData(userData);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredDate("");
    setEnteredPlace("");
    setEnteredPhoneNumber("");
    setTouchFirstName(false);
    setTouchLastName(false);
    setTouchPlace(false);
    reset();
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
        {enteredFirstName.trim().length < 2 && touchFirstName && (
          <p style={{ color: "red" }}>Please enter proper firstname.</p>
        )}
        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          value={enteredLastName}
          onChange={LastNameChangeHandler}
        />
        {enteredLastName.trim().length < 2 && touchLastName && (
          <p style={{ color: "red" }}>Please enter proper lastname.</p>
        )}
        <label htmlFor="birthdate">D.O.B</label>
        <input
          id="birthdate"
          type="date"
          value={enteredDate}
          onChange={dateChangeHandler}
        />
        {!dateValid && (
          <p style={{ color: "red" }}>Birth date cannot be in the future</p>
        )}
        <label>Address Line 1: </label>
        <textarea
          rows={5}
          cols={15}
          onChange={address1ChangeHandler}
          value={addressState.addressLine1}
        />
        {addressState.addressLine1.trim().length < 2 && (
          <p style={{ color: "red" }}>Length is short.</p>
        )}
        <label>Address Line 2: </label>
        <textarea
          rows={5}
          cols={15}
          onChange={address2ChangeHandler}
          value={addressState.addressLine2}
        />
        {addressState.addressLine2.trim().length < 2 && (
          <p style={{ color: "red" }}>Length is short.</p>
        )}
        <label>Place of Birth</label>
        <input type="text" value={enteredPlace} onChange={placeChangeHandler} />
        {enteredPlace.trim().length < 2 &&touchplace && (
          <p style={{ color: "red" }}>Length is short.Enter proper place.</p>
        )}

        <label htmlFor="phonenumber">Phone Number</label>
        <input
          id="phonenumber"
          type="number"
          maxLength={10}
          onChange={phoneNumberChangeHandler}
          value={enteredPhoneNumber}
          className={classes["hide-number-arrow"]}
        />
        {!phoneValid && (
          <p style={{ color: "red" }}>Phone number cannot be more than 10.</p>
        )}
        <label htmlFor="profilephoto">Profile Picture</label>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          accept=".jpg,.png"
        />

        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};
export default AddUser;
