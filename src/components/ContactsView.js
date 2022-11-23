import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // use a fetch request to displat the contact and ID
    // according to parameter changes
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setContact(data);
      });
  }, []);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      {/* display full name as a header whenshowing contact details */}
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      {/* address, email, linkedIn and twitter will appear in a vertical
row beneath individuals name */}
      <p>
        {contact.street} {contact.city}
      </p>
      <p>{contact.email}</p>
      <p>LinkedIn: {contact.linkedIn}</p>
      <p>Twitter: {contact.twitter}</p>
    </div>
  );
}

export default ContactsView;
