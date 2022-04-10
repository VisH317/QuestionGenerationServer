import "./App.css"
import React from 'react'
import Switch from './Switch'
import toggleDarkMode from "./darkMode"
const { useState } = React


function DataShow(response) {
  const json_response = response.json
  let ocr_output_dom = "";
  if (json_response.OCR_output) {
    ocr_output_dom = <p> OCR Output: &nbsp; {json_response.OCR_output} </p> 
  }
  return (
    <div className="DataShow">
      <p> Question: &nbsp; {json_response.question} </p>
      {ocr_output_dom}
    </div>
  )
}

function handleSubmit(e, setResponse) {
  e.preventDefault();
  const form = new FormData(e.target);

  if (e.target[2].value !== "" && e.target[1].value === "") {
    // text selected
    
    // replace inner html of submit button with loading 
    document.getElementById("submitButton").value = "Processing...";

    console.log("text selected")
    fetch("/processText", {
      method: "POST",
      body: form
    })
    .then(res => res.json())
    .then(res => {
      console.log("Response:", res)
      setResponse(res)
    });
  } 
  else if (e.target[2].value === "" && e.target[1].value !== "") {
    // file selected

    // replace inner html of submit button with loading 
    document.getElementById("submitButton").value = "Processing...";

    console.log("file selected")
    fetch("/process", {
      method: "POST",
      body: form
    })
    .then(res => res.json())
    .then(res => {
      setResponse(res)
    });
  }
  else {
    alert("Either a picture must be a provided, or a text must be provided.")
  }
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
          <input type="text" name="projectName" id="projectName" placeholder="Insert Name Here..." required />

          <p className="LabelInput">Picture:</p>
          <label for="file" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Upload File
          </label>
          <input className='form' type="file" name="file" autoComplete="off" id="file" type="file" />

          <p className="LabelInput" id="pTagText">Text:</p>
          <span class="resizable-input">
            <input type="text" name="InputText" id="InputText" placeholder="Insert Text Here..." />
            <span></span> 
          </span>
          <input className='form' id="submitButton" type="submit" value="Submit"></input>
        </form>
      </div>
      <DataShow json={response} />
    </div>
  )
}

export default App