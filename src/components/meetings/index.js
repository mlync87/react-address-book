import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import meetings info from ./meetings file
import Meeting from "./Meeting";
// declare a const to contain name and make it an empty array
// ready to have info placed into it.
const initialState = {
  name: '',
}
// declare meetings as a function and retrieve data from setmeetings
// component in the meetings file.
function Meetings() {
  const [meetings, setMeetings] = useState([])
  const [meetingData, setMeetingData] = useState(initialState)
  //   use id number to identify individual items
  const { id } = useParams()
  //React async
  // React Async is a utility belt for declarative promise resolution and data fetching.
  // It makes it easy to handle asynchronous UI states, without assumptions about the shape
  // of your data or the type of request.
  // use conditional rendering to update url and update meetings data
  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}/meetings`)
    const data = await res.json()
    setMeetings(data)
  }, [])
  // update meetings data whenever new info is retrieved from name. value
  const handleChange = event => {
    const { name, value } = event.target
    const newMeetingData = { ...meetingData }
    newMeetingData[`${name}`] = value
    setMeetingData(newMeetingData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // The await operator is used to wait for a Promise and get its fulfillment value.
    // It can only be used inside an async function or at the top level of a module.
    const res = await fetch(`http://localhost:4000/contacts/${id}/meetings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingData)
    })
    const data = await res.json()
    setMeetings([...meetings, data])
  }

  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>

      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Create A Meeting</h2>

        <label htmlFor="name">Meeting Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required onChange={handleChange}
          value={meetingData.name}
        />

        <div className="actions-section">
          <button className="button blue" type="submit">
            Create
          </button>
        </div>
      </form>

      <ul className="contacts-list">
        {meetings.map((meeting) => (
          <Meeting key={meeting.id} data={meeting} />
        ))}
      </ul>
    </>
  )
}

export default Meetings;
