import { createSlice } from "@reduxjs/toolkit";

export const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    value: [],
  },
  reducers: {
    setInbox: (state, convos) => {
      console.log(convos.payload);
      state.value = convos.payload;
    },

    addConvo: (state, convo) => {
      state.value = [convo.payload, ...state.value];
      console.log(convo.payload);
      console.log(state.value);
    },
  },
});

export const { setInbox, addConvo } = inboxSlice.actions;

export const selectInbox = (state) => state.inbox.value;

export default inboxSlice.reducer;
