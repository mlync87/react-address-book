import { useState } from "react";
import { Link, Routes, useSearchParams } from "react-router-dom";
import ContactsView from "./ContactsView";
// "contacts" must be passed as a prop to this component
function ContactsList(props) {
  const { contacts } = props;

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                {/* create a link, and display updated information according to entry
                inset the text that will appear on the page */}
                <Link to={`/contacts/${contact.id}`} state={{ contact }}>
                  View
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
