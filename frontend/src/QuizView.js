import "./QuizView.css"
import "./App.css"
import React from 'react';
import toggleDarkMode from './darkMode';
import Switch from './Switch'
const { useState } = React

function QuizView() {
    const [lightMode, setLightMode] = useState(true)
  
    return (
        <body>
            <Switch 
                isOn={lightMode}
                handleToggle={() => toggleDarkMode(setLightMode, lightMode)}
                onColor="#EF476F"
            />
            <h1 className='Title'>Your Quizzes</h1> 
            <div id="NewQuiz">New Quiz</div>
        </body>
    );
}

export default QuizView;