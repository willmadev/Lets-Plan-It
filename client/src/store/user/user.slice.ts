import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log("Set User: ", action.payload);
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setUser, setUserEmail, setUserId, setUserName } = slice.actions;

export default slice.reducer;
