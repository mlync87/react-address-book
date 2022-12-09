// i have added contactsEdit and meetings. I will need to create these in
// the components section.
// Also, i corrected the spelling of "Link" as in lower case it would not work.
import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList.js"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"

import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // useEffect will re render the page when information is added/edited
  useEffect(async () => {
    // a fetch request will change URL and open details
    // then convert to json
    // console log to check the value and update the state
    //   fetch("http://localhost:4000/contacts/?results=50")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log("contact data", data);
    //       setContacts(data);
    //     });
    // }, []);
    const res = await fetch("http://localhost:4000/contacts")
    const data = await res.json()
    setContacts(data)
    setIsLoading(false)
  }, [])
  // an empty array will have data interpolated into
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
            {/* the link to my contacts folder was incorrect. ammended here */}
            <Link to="/contacts/add">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        {/* use route tags to display path in browser. This will show component in
use and any props being used. */}
        <Routes>
          {/* i have ammended my routes to include loading, edit, and meetings */}
          <Route path='/' element={<ContactsList contacts={contacts} setContacts={setContacts} isLoading={isLoading}/>} />
          <Route path='/contacts/add' element={<ContactsAdd setContacts={setContacts} contacts={contacts}/>} />
          <Route path='/contacts/:id' element={<ContactsView />} />
          <Route path='/contacts/:id/edit' element={<ContactsEdit setContacts={setContacts} contacts={contacts}/>} />
          
        </Routes>
      </main>
    </>
  )
}
