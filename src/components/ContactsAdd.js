// UseEffect and navigate needed to be removed from the imports
// useEffect was declared previously, but was not being implemented.
// i had to uninstall "prettier" extension as upon save it would change
// all my single quotation marks into doubles and applies semi colons when
// not needed.
// declaring all variables with if statements eventually became too confusing
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// as there is no syntax i've decided to move a few of my components
// declare initialState as a const and
const initialState = {
  firstName: '',
  lastName:'',
  street:'',
  city:'',
  email:'',
  linkedIn:'',
  twitter:'',
}
// i had initially declared setContacts and contacts as props.
// also, i had declared all my data as arrays in consts and implemented them as
// usestate.
function ContactsAdd({ setContacts, contacts }) {
  // DO NOT FORGET
  // !!setContacts and contacts must be passed as props!!
  // also ensure sending post to json server on form submit
  const [contactData, setContactData] = useState(initialState)
  // declare navigate as a const and have it equal the data input into
  // the useNavigate data import
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    const newContactData = { ...contactData }
    newContactData[`${name}`] = value
    setContactData(newContactData)
  }
  // Remove if statements as not required anymore
  // if (inputName === "firstName") {
  //   setFirstName(inputValue);
  // } else if (inputName === "lastName") {
  //   setLastName(inputValue);
  // } else if (inputName === "street") {
  //   setStreet(inputValue);
  // } else if (inputName === "city") {
  //   setCity(inputValue);
  // } else if (inputName === "email") {
  //   setEmail(inputValue);
  // } else if (inputName === "linkedIn") {
  //   setLinkedIn(inputValue);
  // } else if (inputName === "twitter") {
  //   setTwitter(inputValue);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const res = await fetch('http://localhost4000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
      })
      const data = await res.json()
      setContacts([...contacts, data])
      navigate('/')
  }

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const newContact = {
//     firstName: firstName,
//     lastName: lastName,
//     street: street,
//     city: city,
//     email: email,
//     linkedIn: linkedIn,
//     twitter: twitter,
//   };

//   fetch("http://localhost:4000/contacts", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newContact),
//   })
//     .then((response) => {
//       console.log("response", response);
//       return response.json();
//     })

//     .then((data) => {
//       console.log("post data", data);
//       setContacts([...contacts, data]);
//       Navigate(`/`);
//     })

//     .catch((error) => {
//       console.log(error);
//     });

//   let navigate = useNavigate();

  return (
    // ensure onsubmit will adjust accordingly by using "handsubmit"
    // you can just copy/paste this x7 and make changes
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <select name="type" onChange={handleChange} value={contactData.type}>
        <option id="default">Select...</option>
        <option id="personal">personal</option>
        <option id="work">work</option>
      </select>

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
      {/* the type for email needed to be hanged from text to email */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        value={email}
        required
      />
      {/* the type for linkedIn needed to be links */}
      <label htmlFor="linkedIn">LinkedIn</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="url"
        onChange={handleChange}
        value={linkedIn}
        required
      />
      {/* the type for twitter needed to be a url */}
      <label htmlFor="twitter">Twitter</label>
      <input
        id="twitter"
        name="twitter"
        type="url"
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
  )
}
export default ContactsAdd
