import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import notificationReducer from "../slices/notificationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});
