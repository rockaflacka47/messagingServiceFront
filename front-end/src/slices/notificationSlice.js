import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: {
      text: "",
      error: false,
      visible: false,
    },
  },
  reducers: {
    setNotification: (state, notif) => {
      console.log(notif);
      state.notification.text = notif.payload.text;
      state.notification.error = notif.payload.error;
      state.notification.visible = notif.payload.visible;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification.notification;

export default notificationSlice.reducer;
