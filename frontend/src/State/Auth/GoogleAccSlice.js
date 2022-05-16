import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUser = createAsyncThunk(
    'users/getUser',
    async (thunkAPI) => {
        const res = await axios.get('/auth/current_user')
        return res.data
    }
)

const initialState = {
    value: {},
    status: 'idle'
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            state.status = 'pending'
        })
            .addCase(getUser.fulfilled, (state, action) => {
            state.status = 'completed'
            state.value = action.payload
        })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'rejected'
            })
    }
})

export default userSlice.reducer