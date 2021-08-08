import React from 'react';
import { Link } from "react-router-dom";
import user from "../images/1.JPG";

const ContactCard = (props) => {
    const { id, name, email } = props.contact;
    return (
        <div className="item">
            <img className="ui avatar image" src={user} />
            <div className="content">
                <Link to={{ pathname: `/EmpContact/contact/${id}`, state: { contact: props.contact } }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i className="trash alternate outline centered icon"
                style={{ color: 'red', margin: "7px", marginLeft: "10px" }}
                onClick={() => props.clickHandler(id)}></i>

            <Link to={{ pathname: `/EmpContact/edit/`, state: { contact: props.contact } }}>
                <i className="edit alternate outline  icon"
                    style={{ color: 'blue', margin: "0px" }}
                ></i>
            </Link>

        </div>
    );
};
export default ContactCard;

