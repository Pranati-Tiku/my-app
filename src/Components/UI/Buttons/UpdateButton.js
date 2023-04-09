import React from "react";
import classes from './Button.module.css';
const UpdateButton = (props) => {
    const updateHandler = () => {
        props.updateItem(props.id);
    }
    return <button className={classes.button} onClick={updateHandler}>{props.children}</button>

};
export default UpdateButton;