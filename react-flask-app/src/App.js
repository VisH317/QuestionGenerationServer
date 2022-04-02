import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/process").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (

    <form method="post" action="/process" enctype="multipart/form-data">
      <dl>
        <p>
          <input type="file" name="file" autocomplete="off" required></input>
        </p>
      </dl>
      <p>
        <input type="submit" value="Submit"></input>
      </p>
    </form>
  )
}

export default App