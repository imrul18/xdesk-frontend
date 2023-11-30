// import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '@src/http';

export const Signin = createAsyncThunk('Auth/Signin', async (data) => {
  const response = await Api.post('login', data) 
  if (response?.status == 200) {
    return { 'status': true, 'data': response?.data};
  } else {
    return { 'status': false, 'data': response?.data };
  }
})

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    UserData: [],
    accessToken: null
  },
  extraReducers: builder => {
    builder
      .addCase(Signin.fulfilled, (state, action) => {
        if(action?.payload?.status) {
          console.log("🚀 ~ file: index.js:24 ~ .addCase ~ action?.payload:", action?.payload)
          localStorage.setItem('userData', JSON.stringify(action.payload?.data?.data))
          localStorage.setItem('accessToken', JSON.stringify(action.payload?.data?.data?.token))
          state.UserData = action.payload?.user
          state.accessToken = action.payload?.token
        }
      })
    }
})

export default AuthSlice.reducer
