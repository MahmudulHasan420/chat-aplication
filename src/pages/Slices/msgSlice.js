import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  senderName: "" ,
}

export const msgSlice = createSlice({
  name: 'msguser',
  initialState,
  reducers: {
    msgUserInfo: (state, action) => {
        
        console.log(action.payload);
        state.senderName = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { msgUserInfo } = msgSlice.actions

export default msgSlice.reducer