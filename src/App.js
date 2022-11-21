import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    // use a fetch request to the local server being used
    fetch("http://localhost:3000/contacts")
      .then((res) => res.json())
      .then((data) => {
        // console log the result
        console.log("contact data", data);
        setContacts(data);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* create links to specified items and show text displayed */}
          {/* TODO: Make these links */}
          <li>
            {/* the "/" is the main area of the page */}
            <Link to="/">Contacts List</Link>
          </li>
          <li>
            <Link to="/addNewContact">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        {/* create routes to retrieve and display data from other sections when the link is clicked */}
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            path="/addNewContact"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
}
