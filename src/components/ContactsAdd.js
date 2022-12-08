// UseEffect and navigate needed to be removed from the imports
// useEffect was declared previously, but was not being implemented.
// i had to uninstall "prettier" extension as upon save it would change
// all my single quotation marks into doubles and applies semi colons when
// not needed.
// declaring all variables with if statements eventually became too confusing
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// as there is no syntax i've decided to move a few of my components
// declare initialState as a const and
const initialState = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  type: '',
  email: '',
  linkedin: '',
  twitter: ''
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

  const handleChange = event => {
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

  const handleSubmit = async event => {
    event.preventDefault()

    const res = await fetch('http://localhost:4000/contacts', {
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
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <select name="type" onChange={handleChange} value={contactData.type}>
        <option id="default" >Select...</option>
        <option id="personal" >personal</option>
        <option id="work" >work</option>
      </select>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required onChange={handleChange} value={contactData.firstName}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={handleChange} value={contactData.lastName}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={handleChange} value={contactData.street}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={handleChange} value={contactData.city}/>

      <label htmlFor="email">email:</label>
      <input id="email" name="email" type="email" required onChange={handleChange} value={contactData.email}/>

      <label htmlFor="linkedin">Linkedin:</label>
      <input id="linkedin" name="linkedin" type="url" required onChange={handleChange} value={contactData.linkedin}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="url" required onChange={handleChange} value={contactData.twitter}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
