import { configureStore } from '@reduxjs/toolkit'

import userSlice from './Auth/GoogleAccSlice'
import QuizSlice from './Api/QuizSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        quizzes: QuizSlice
    }
})

export default store