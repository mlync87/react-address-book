import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  const { id } = useParams();

  useEffect(async () => {
    // use a fetch request to displat the contact and ID
    // according to parameter changes
    // interesting thing about await, it can only be used in an async
    const res = await fetch(`http://localhost:4000/contacts/${id}`);
    const data = await res.json();

    setContact(data);
  }, []);

  if (!contact) {
    // return Loading while there is no contact present
    return <p>Loading</p>;
  }

  return (
    <div>
      {/* display full name as a header whenshowing contact details */}
      <h2>
        {/* request the type on contact to be returned also */}
        {contact.firstName} {contact.lastName} ({contact.type})
      </h2>
      {/* address, email, linkedIn and twitter will appear in a vertical
row beneath individuals name */}
      <p>
        <a href={contact.linkedIn}>LinkedIn</a> |
        <a href={contact.twitter}>Twitter</a>
      </p>
      <p>email: {contact.email}</p>
      <p>
        address: {contact.street} {contact.city}
      </p>

      <Link to={`/contacts/${contact.id}/meetings`}>Meetings</Link>
    </div>
  );
}

export default ContactsView;
