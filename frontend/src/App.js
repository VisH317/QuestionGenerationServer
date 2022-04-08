import "./App.css"
import React from 'react'
import Switch from './Switch'
import toggleDarkMode from "./darkMode"
const { useState } = React

function getData(form) {
  return fetch("/process", {
    method: "POST",
    body: form
  }).then(res => res.json())
}

function DataShow(response) {
  const json_response = response.json
  return (
    <div className="DataShow">
      <p> Question: {json_response.question} </p>
      <p> OCR_output: {json_response.OCR_output} </p>
    </div>
  )
}

function handleSubmit(e, setResponse) {
  e.preventDefault();
  const form = new FormData(e.target);
  getData(form)
    .then(res => {
      console.log("Response:", res)
      setResponse(res)
    });
}

function App() {
  const [response, setResponse] = useState([{}])
  const [lightMode, setLightMode] = useState(true)
  return (
    <div className='mainDiv'>
      <Switch 
        isOn={lightMode}
        handleToggle={() => toggleDarkMode(setLightMode, lightMode)}
        onColor="#EF476F"
      />
      <h1 className='Title'>GenQuiz</h1>
      <div className="inputDiv">
        <form method="post" action="/process" encType="multipart/form-data" onSubmit={(e) => handleSubmit(e, setResponse)}>
          <p className="LabelInput" id="FirstInput">Name:</p>
          <input type="text" name="projectName" id="projectName" placeholder="Insert Name Here..." />

          <p className="LabelInput">Picture:</p>
          <label for="file" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Upload File
          </label>
          <input className='form' type="file" name="file" autoComplete="off" required id="file" type="file" />

          <input className='form' type="submit" value="Submit"></input>
        </form>
      </div>
      <DataShow json={response} />
    </div>
  )
}

export default App