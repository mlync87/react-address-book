import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit({ setContacts, contacts }) {
  const [contactData, setContactData] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`)
    const data = await res.json()
    setContactData(data)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    const newContactData = { ...contactData }
    newContactData[`${name}`] = value
    setContactData(newContactData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const res = await fetch(`http://localhost:4000/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    })
    const data = await res.json()
    const updatedContacts = contacts.map(contact =>
      contact.id === Number(id) ? data.contact : contact)
    setContacts(updatedContacts)
    navigate(`/contacts/${id}`)
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Update Contact</h2>

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
        required
        onChange={handleChange}
        value={contactData.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
        value={contactData.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
        value={contactData.street}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        value={contactData.city}
      />

      <label htmlFor="email">email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        onChange={handleChange}
        value={contactData.email}
      />

      <label htmlFor="linkedin">Linkedin:</label>
      <input
        id="linkedin"
        name="linkedin"
        type="url"
        required
        onChange={handleChange}
        value={contactData.linkedin}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="url"
        required
        onChange={handleChange}
        value={contactData.twitter}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Update
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
