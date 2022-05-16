# Notes about this repository 

## Backend

1. First runs `app.py` 

## Frontend

1. First uses `index.js` as a starting point. 
    - Furthermore, we have ./State/Store.js that helps out with Redux initialization
    - Initializes a "Provider" from Redux. This can be thought as "initializes" Redux
        - QUESTION: Do we use redux? Is it so we have variables and information across different files? Maybe like the user information? Initializes `store` for initializing redux?

3. Then Initializes App, which is defined in `./Components/App.js` 
    - Initializes "dispatch" and "useSelector". Basically, maybe uses redux in order to get user information.
    - Furthermore, GoogleAccSlice has something to do with react redux. Maybe initializes or sets the current user? Communicates with backend
        - Also uses /State/GoogleAccSlice.js and store.js
    - Uses the `Routes` and `BrowserRouter` from react-router-dom
    - Has two if statements, either that the user is not logged in or the user is logged in. 
        - If not logged in, initializes `NavBar` and `Landing`. This is initialized with the `react-router-dom` library
        - If it is logged on, well it just says, "Poggers ure logged in" which makes no sense at all Vishrut why have you done this
       
4. Landing is defined in Components/Landing, which doesn't really do anything except initialize a header and an href to /auth/login (backend)

5. Taskbar is also defined in Components/NavBar
    - There's various utils like Dropdown that is not implemented yet :)  
    - They also use NavLink
        - If .loc is 0, uses <a> if not, uses Link from, you guessed it, `react-router-dom`  
        - QUESTION: What is the difference? Why use `Link` from `react-router-dom` and why use `a` when communicating over backend?
    - In taskbar, there's GenQ and About button. This is linked via `react-router-dom`
    - There's also a Login button. This is linked via a standard <a> attribute. 

6. There's also `QuizView`, which is not implemented in the main program yet, but I think it might be there instead of the "Poggers ure logged in"

7. There's also `NewQuiz` but the code is so bad compared to Vishrut's code that you could automatically guess that I was the one who wrote it. You'd be correct.
    - Probably going to be rewritten

8. There's also `Assets`. Which has absolutely nothing but would probably contain our logo.js or graphical designs (I'm guessing)

Keep in mind of the organization when writing new files! It's really good :)  

## Backend:

1. First, uses `app.py` to start
    - First, initialize `appinit.py`, which is literally just a one liner initializing Flask
        - QUESTION: What is the static folder? It points to a directory that we do not even have
            - A directory of static files, which means no dynamic content and the file doesn't change. Does this mean we have no static files
    - Adjusts config so that the "secret key" is dev and the database is something
        - QUESTION: What is the "secret key"? 
    - Uses `GoogleRoutes` and the app object created from `appinit` will register the blueprint of GoogleRoutes

2. 

Frontend:
- Learn basic Redux syntax: (storage of objects across all objects)
- Learn basic react-router-dom (used in `./frontend/src/Components/App.js` for Routes and BrowserRouter. Maybe has to do something with not reloading the page but still changing the URL. Also used in navbar.js as a link to the backend using the 'Link' class)

Backend: 
- How does google routes work

## Notes with Vishrut Day 1

- Postgresql: the actual database that is going to be using
- PGadmin: the connection to the postgresql in Python
- Docker initializes both of them and runs it in a port
    - In Docker, a "container" can be likened as a tiny virtual environment
