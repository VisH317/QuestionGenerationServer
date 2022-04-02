import React from 'react'
const { useState } = React

function getData (form) {
  return fetch("/process", {
    method: "POST",
    body: form
  }).then(res => res.json())
}

function DataShow (response) {
  const json_response = response.json
  return (
    <div>
      <p> Question: { json_response.question } </p>
      <p> OCR_output: { json_response.OCR_output } </p>
    </div>
  )
}

function App() {
  const [response, setResponse] = useState([{}])

  function handleSubmit (e) {
    e.preventDefault();
    const form = new FormData(e.target);
    getData(form)
    .then(res => {
      console.log("Response:", res)
      setResponse(res)
    });
  }

  return (
    <div>
      <form method="post" action="/process" encType="multipart/form-data" onSubmit={handleSubmit}>
        <dl>
          <p>
            <input type="file" name="file" autoComplete="off" required></input>
          </p>
        </dl>
        <p>
          <input type="submit" value="Submit"></input>
        </p>
      </form>
      <DataShow json={response} />
    </div>
  )
}

export default App