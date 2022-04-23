
function toggleDarkMode(setLightMode, lightMode, body = document.querySelector("body")) {
    // iterate over body
    if (body === document.querySelector("body")) setLightMode(!lightMode)
    body.style.transition = "background-color .5s"
    body.classList.toggle("darkMode")
    for (let i = 0; i < body.children.length; i++) {
        const child = body.children[i];
        if (child.tagName === "DIV" || child.type === "FORM") {
            toggleDarkMode(setLightMode, lightMode, child);
        }
        else {
            child.classList.toggle("darkMode");
        }
    }
}

export default toggleDarkMode