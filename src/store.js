import { configureStore } from '@reduxjs/toolkit'
import userSlice from './pages/Slices/userSlice'
import msgSlice from './pages/Slices/msgSlice'

export const store = configureStore({
  reducer: {
    activeUser : userSlice,
    msgSender : msgSlice,
  },
})