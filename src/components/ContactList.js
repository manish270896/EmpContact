import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";


const ContactList = (props) =>  {
    // console.log(props);
    const deleteContactHandler = (id) =>{
        props.getContactId(id);
    };
    const inputEl = useRef("");
    const getSearchTerm = () => {
        //console.log(inputEl);
        props.searchKeyword(inputEl.current.value);
    };

    const a = props.contacts.map((contact) => {
        return(
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key ={contact.id} ></ContactCard>
        );
    });
    return(
        <div class="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i> 
                </div>
            </div>
            <div className="ui celled list">{a.length > 0 ? a: "No contacts found"}</div>
        </div>
        
    );
};

export default ContactList;