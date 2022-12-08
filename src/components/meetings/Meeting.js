// here we will declare a const and use it to display the data we
// retrieve. I will be displayed by name as a list item. The info will
// be imported into the index.js in the meetings file.
const Meeting = ({ data }) => 
  <li className="contact">
    <p>{data.name}</p>
  </li>


export default Meeting
