import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // DO NOT FORGET
  // !!setContacts and contacts must be passed as props!!
  // also ensure sending post to json server on form submit
  const { setContacts, contacts } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    if (inputName === "firstName") {
      setFirstName(inputValue);
    } else if (inputName === "lastName") {
      setLastName(inputValue);
    } else if (inputName === "street") {
      setStreet(inputValue);
    } else if (inputName === "city") {
      setCity(inputValue);
    } else if (inputName === "email") {
      setEmail(inputValue);
    } else if (inputName === "linkedIn") {
      setLinkedIn(inputValue);
    } else if (inputName === "twitter") {
      setTwitter(inputValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      firstName: firstName,
      lastName: lastName,
      street: street,
      city: city,
      email: email,
      linkedIn: linkedIn,
      twitter: twitter,
    };

    fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        console.log("response", response);
        return response.json();
      })

      .then((data) => {
        console.log("post data", data);
        setContacts([...contacts, data]);
        Navigate(`/`);
      })

      .catch((error) => {
        console.log(error);
      });

    setFirstName("");
    setLastName("");
    setStreet("");
    setCity("");
    setEmail("");
    setLinkedIn("");
    setTwitter("");
  };

  let navigate = useNavigate();

  return (
    // ensure onsubmit will adjust accordingly by using "handsubmit"
    // you can just copy/paste this x7 and make changes
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={firstName}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="firstName"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={lastName}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        onChange={handleChange}
        value={street}
        required
      />

      <label htmlFor="city">City</label>
      <input
        id="city"
        name="city"
        type="text"
        onChange={handleChange}
        value={city}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        onChange={handleChange}
        value={email}
        required
      />

      <label htmlFor="linkedIn">LinkedIn</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        onChange={handleChange}
        value={linkedIn}
        required
      />

      <label htmlFor="twitter">Twitter</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        onChange={handleChange}
        value={twitter}
        required
      />

      <div className="actions-section">
        <button className="button-blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
export default ContactsAdd;
