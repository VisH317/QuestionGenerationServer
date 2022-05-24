import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getQuizzes = createAsyncThunk(
    'quizzes/getQuizzes',
    async (userRef, thunkAPI) => {
        const res = await axios.get('/api/quiz', {
            headers:  {
                'Content-Type': "application/json" 
            },
            params: {
                userref: String(userRef)
            }  
        })

        return res.data
    }
)

export const createQuiz = async (userRef, prompt, question) => {
    console.log("yes")
    const res = await axios.post('/api/quiz/new', {
        headers: {
            'Content-Type': "application/json"
        },
        data: { userRef, prompt, question }
    })

    return res.data
}

const initialState = {
    status: 'idle',
    value: []
} 

const quizSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getQuizzes.pending, (state, action) => {
            state.status = 'pending'
        })
            .addCase(getQuizzes.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = action.payload
            })
            .addCase(getQuizzes.rejected, (state, action) => {
                state.status = 'rejected'
            })
    }
})

export default quizSlice.reducer