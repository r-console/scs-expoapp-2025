import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counterSlice"
import userReducer from "./userSlice"
import signReducer from "./signSlice"
import urlReducer from "./urlSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    sign: signReducer,
    url: urlReducer,
  },
})

export default store
