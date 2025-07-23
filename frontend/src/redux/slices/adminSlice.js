import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    links:null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
  },
});

export const { setAdmin ,setLinks} = adminSlice.actions;
export default adminSlice.reducer;
