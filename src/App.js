import { useEffect, useState } from "react";
import { link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import "./styles/styles.css";
import ContactsView from "./components/ContactsView";

export default function App() {
  const [contacts, setContacts] = useState([]);
  // useEffect will re render the page when information is added/edited
  useEffect(() => {
    // a fetch request will change URL and open details
    // then convert to json
    // console log to check the value and update the state
    fetch("http://localhost:4000/contacts/?results=50")
      .then((res) => res.json())
      .then((data) => {
        console.log("contact data", data);
        setContacts(data);
      });
  }, []);
  // an empty array will run when component initially loads
  return (
    <>
      <nav>
        <h2>Menu</h2>
        {/* use an unordered list to display the links on the page */}
        <ul>
          {/* each list item will contain an individual link */}
          <li>
            {/* create links and text displayed on page */}
            <Link to="/">Contacts List</Link>
          </li>
          <li>
            <Link to="/addNewContact">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        {/* use route tags to display path in browser. This will show component in
use and any props being used. */}
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            Path="/addNewContact"
            element={
              <contactAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts.id" element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
}
