import React from 'react';
import {Link} from "react-router-dom";
import user from "../images/1.JPG";

const  ContactDetails = (props) => {
    const {name,email} = props.location.state.contact;
    console.log(props);
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user"/>

                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="centered center-div">
                <Link to="/">
                    <button className="ui button blue center">Back</button>
                </Link>
            </div>
        </div>
    );
};
export default  ContactDetails;

