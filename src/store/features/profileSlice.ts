// src/store/features/authSlice.ts

import { createSlice } from '@reduxjs/toolkit';

const initialState={
    profie:null
}

const profilSlice = createSlice({
  name: 'profile',
  initialState,

   reducers: {
    setProfile: (
      state,
      action:any
    ) => {
      state.profie = action.payload;
     
    }

  
  }},
);

export const { setProfile } = profilSlice.actions;
export default profilSlice.reducer;
