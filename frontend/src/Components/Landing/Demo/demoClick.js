// will implement api call
function demoClick (button, resultParagraph, prompt) {
    const textBefore = button.innerHTML
    button.innerHTML = "Processing..."
   
    // Create form

    var form = new FormData()
    console.log("Test: " + prompt.value)
    form.append("InputText", prompt.value)

    fetch("/api/processText", {
      method: "POST",
      body: form
    })
    .then(res => res.json())
    .then(res => {
        resultParagraph.innerHTML = res["question"];
        button.innerHTML = textBefore 
    })
}

export default demoClick;