import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {uuid} from 'uuidv4';        // for unique id in list
import './App.css';
import api from '../api/contacts'
import Header from "./Header";
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import EditContact from './EditContact';

function App() {

  const LOCAL_KEY = "contacts";
  const [contacts, setContacts]= useState([]);
  const [searchTerm, setSearchContact] = useState("");
  const [searchResults, setSearchResults] = useState("");

  //Retrieve contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }
  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }

    const response = await api.post("/contacts",request);
    setContacts([...contacts,response.data]);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email} = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact;
    }));
  }

  const searchHandler =  (searchTerm) => {
    //console.log(searchTerm);
    setSearchContact(searchTerm);
    if(searchTerm !== "")
    {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ").toLowerCase()
        .includes(searchTerm.toLowerCase());
        
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  const removeContact = async (id) => {
    await api.delete(`./contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllData = async () => {
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllData();
    },[]);

useEffect(()=> {
  //localStorage.setItem(LOCAL_KEY,JSON.stringify(contacts));
  },[contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/add"  
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler}/>
            )}
          />

          <Route path="/" exact 
            render={(props) => (
              <ContactList 
                {...props} 
                contacts={searchTerm.length < 1 ? contacts : searchResults} 
                getContactId={removeContact}
                term = {searchTerm}
                searchKeyword = {searchHandler}
              />
            )}
          />

          <Route path="/contact/:id"  
            component={ContactDetails}
          />

          <Route path="/edit/"  
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler}/>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
