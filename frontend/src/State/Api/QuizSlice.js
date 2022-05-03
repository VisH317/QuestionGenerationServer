import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getQuizzes = createAsyncThunk(
    'quizzes/getQuizzes',
    async (userRef, thunkAPI) => {
        const res = await axios.get('api/quizzes', {
            headers:  {
                'Content-Type': "application/json" 
            },
            params: {
                userRef
            }  
        })

        return res.data
    }
)

export const createQuiz = createAsyncThunk(
    'quizzes/createQuiz',
    async (userRef, prompt, question) => {
        const res = await axios.post('api/quizzes', {
            headers: {
                'Content-Type': "application/json"
            },
            data: { userRef, prompt, question }
        })

        return res.data
    }
)

const initialState = {
    status: 'idle',
    createStatus: 'idle',
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
                state.status = 'idle',
                state.value = action.payload
            })
            .addCase(getQuizzes.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(createQuiz.pending, (state, action) => {
                state.createStatus = 'pending'
            })
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.createStatus = 'idle'
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.createStatus = 'rejected'
            })
    }
})

export default quizSlice.reducer