import React, { useState, useEffect } from 'react'

function DataDisplay (props) {
  const data = props.data
  console.log("data")
  if (typeof data.members === 'undefined') {
    return (
      <p>Loading...</p>
    )
  }
  else {
    return (
      <div> 
        <p> {data.members.length} members found</p>
      </div>
    )
  }
}

function App() {
  const [data, setData] = useState([{}])

  function handleSubmit (e) {
    e.preventDefault();
    // create form 
    const form = new FormData(e.target);
    fetch("/process", {
      method: "POST",
      body: form
    })
    .then(res => res.json())
    .then(res => {
      setData(res)
      console.log(res)
    });
  }

  return (
    <div>
      <form method="post" action="/process" encType="multipart/form-data" onSubmit={
        (e) => handleSubmit(e)
      }>
        <dl>
          <p>
            <input type="file" name="file" autoComplete="off" required></input>
          </p>
        </dl>
        <p>
          <input type="submit" value="Submit"></input>
        </p>
      </form>
      <DataDisplay data={data} />
    </div>
  )
}

export default App