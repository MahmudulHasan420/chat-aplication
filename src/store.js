import { configureStore } from '@reduxjs/toolkit'
import userSlice from './pages/Slices/userSlice'

export const store = configureStore({
  reducer: {
    activeUser : userSlice,
  },
})