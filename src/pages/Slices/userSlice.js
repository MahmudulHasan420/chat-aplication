import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null ,
}

export const userSlice = createSlice({
  name: 'loggeduser',
  initialState,
  reducers: {
    userinfo: (state, action) => {
        
        console.log(action.payload);
        state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userinfo } = userSlice.actions

export default userSlice.reducer