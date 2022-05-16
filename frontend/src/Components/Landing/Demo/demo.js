import React from 'react'
import './demo.css'
import Typewriter from 'typewriter-effect';

const Demo = props => {
    return (
        <div id="demoDiv">
            <div id="blueDiv"></div>
            <h1 id="Title">GenQ</h1>
            <p id="Description">An AI-powered flashcard system</p>
            <div id="GenQDemo">
                <p>Prompt: </p>

                <Typewriter class="typewriter" 
                    onInit={(typewriter) => {
                        typewriter.typeString('GenQ is an AI-powered flashcard system that enables you to study any topic you want. \
                         All you have to do is take a picture of the notes and let GenQ handle the rest! It is easy as 1,2,3!')
                            .start();
                    
                    }} 
                />

                <p>Question: </p>
                
                <Typewriter class="typewriter"
                    onInit={(typewriter) => {
                        typewriter.typeString('What is GenQ?')
                            .start();
                    }} 
                />
            </div>
        </div>
    )
}

export default Demo;