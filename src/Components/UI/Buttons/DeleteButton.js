import React from "react";
import classes from './Button.module.css';
const DeleteButton = (props) => {
    const deleteHandler = () => {
        props.deleteItem(props.id);
    }
    return <button className={classes.button} onClick={deleteHandler}>{props.children}</button>

};
export default DeleteButton;