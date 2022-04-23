import { configureStore } from '@reduxjs/toolkit'

import userSlice from './Auth/GoogleAccSlice'

const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export default store