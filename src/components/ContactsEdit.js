import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit({ setContacts, contacts }) {
  const [ContactData, setContactData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`);
    const data = await res.json();
    setContactData(data);
  }, []);
}
