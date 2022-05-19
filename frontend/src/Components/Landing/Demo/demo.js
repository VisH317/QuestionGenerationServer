import React, { useState, useRef, useEffect} from 'react'
import './demo.css'
import Typewriter from 'typewriter-effect';
import demoClick from './demoClick.js';

const Demo = props => {
    const [answer_demo_display, set_answer_demo_display] = useState(false)
    const [demo_begin, change_demo_begin] = useState(false)
    const demoQuestionResultRef = useRef(null) 
    const textareaQuestionResultRef = useRef(null) 
     
    function promptResponse (demo_begin) {
        if (demo_begin === false) {
            return (
                <Typewriter 
                    onInit={(typewriter) => {
                        typewriter.changeDelay(10)
                        typewriter.typeString('World War I or the First World War, often abbreviated as WWI or WW1, began on 28 July 1914 and ended on 11 November 1918. Referred to by contemporaries as the "Great War", its belligerents included much of Europe, the Russian Empire, the United States, and the Ottoman Empire, with fighting also expanding into the Middle East, Africa, and parts of Asia.')
                        .start()
                        .callFunction(() => { set_answer_demo_display(true) })
                    }} 
                />
            )
        }
        else if (demo_begin === true) {
            return (
                <textarea ref={textareaQuestionResultRef}>Enter a bunch of facts here!</textarea>
            )
        }
    }

    function questionResponse (default_question, demo_begin) {
        if (default_question === true && demo_begin === false) {
            return (
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.changeDelay(10)
                        typewriter
                        .pauseFor(500)
                        .typeString('What was the first war?')
                        .start()
                    }} 
                /> 
            )
        }
        else if (demo_begin === true) {
            return (<p ref={demoQuestionResultRef}> Result will be shown here!</p>)
        }
    }
    
    function submitButton (demo_begin) {
        if (demo_begin === true) {
            return (
                <button id="Submit" onClick={
                    (self) => demoClick(self.target, demoQuestionResultRef.current, textareaQuestionResultRef.current)
            }>Submit!</button>
            ) 
        }
    }

    // change_demo_begin(!demo_begin);
    // set_answer_demo_display(false);

    function toggleButton (demo_begin) {
        if (demo_begin === true) {
            return (
                <button id="ToggleDemo" onClick={(self) => {
                    change_demo_begin(!demo_begin)
                    set_answer_demo_display(false)
                }}>
                Hide Demo
                </button>
            )
        } else {
            return (
                <button id="ToggleDemo" onClick={(self) => {
                    change_demo_begin(!demo_begin)
                    set_answer_demo_display(false)
                }}>
                Show Demo
                </button>
            ) 
        }
    }

    return (
        <div id="demoDiv">
            <div id="blueDiv">
                <h1 id="Title">GenQ</h1>
                <p id="Description">An AI-powered flashcard system</p>
            </div>
            <div id="GenQDemo">
                <h3>Prompt: </h3>
                {promptResponse(demo_begin)}

                <h3> Question: 
                    {submitButton(demo_begin)}
                </h3> 

                {questionResponse(answer_demo_display, demo_begin)}

                {toggleButton(demo_begin)} 
            </div>
        </div>
    )
}

export default Demo;