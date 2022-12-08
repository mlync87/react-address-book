import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
// import the loading spinner from created file
import Spinner from "./Spinner"

function ContactsList({ contacts, setContacts, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleChange = async event => {
    const { value, checked } = event.target
    const types = searchParams.getAll('type')
    // use if statements to input variances of data when boxes are
    // checked/unchecked.
    if (checked) types.push(value)
    if (!checked) types.splice(types.indexOf(value), 1)
    // set search parameters by referring to type, then sub type
    setSearchParams({ type: types })
    const filteredContacts = await filterByTypes(types)
    setContacts(filteredContacts)
  }
  // declare a const for filtering.
  // use async to fetch data from "types"
  const filterByTypes = async (types) => {
    // use a fetch request to retieve data from url
    const res = await fetch("http://localhost:4000/contacts")
    // use res.json to target the body of the requested data retrieved from url
    const data = await res.json()
    // if the length of the typs is equal to zero, return filtered contact
    // data, as well as the type of contact.
    if (types.length === 0) return data
    return data.filter((contact) => types.includes(contact.type))
  }
  // declare handleDelete a const and use async to retrieve data from fetch.
  const handleDelete = async (id) => {
    // apply a delete method, and allow url to update according to this.
    const res = await fetch(`http://localhost:4000/contacts/${id}`, { method: 'DELETE' })
    const data = await res.json()
    const filteredContacts = contacts.filter(contact => contact.id !== id)
    setContacts(filteredContacts)
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>

      { isLoading ?
      <Spinner /> :
      <>
          <label className="filter">
            <input
              name="type"
              type="checkbox"
              value="personal"
              onChange={handleChange}
            />
            <span>🍻</span> Personal
          </label>
          <label className="filter">
            <input
              name="type"
              type="checkbox"
              value="work"
              onChange={handleChange}
            />
            <span>💻</span> Work
          </label>
          <ul className="contacts-list">
            {contacts.map((contact) => {
              return (
                <li className="contact" key={contact.id}>
                  <p>
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p>
                    <Link to={`/contacts/${contact.id}`}>View</Link>
                    <Link
                      to={`/contacts/${contact.id}/edit`}
                      state={{ contact }}
                    >
                      Edit
                    </Link>
                    <a href="#" onClick={() => handleDelete(contact.id)}>
                      Delete
                    </a>
                  </p>
                </li>
              )
            })}
          </ul>
        </>
      }
    </>
  )
}

export default ContactsList;
