import { createSlice } from "@reduxjs/toolkit"

const urlSlice = createSlice({
  name: "url",
  initialState: {
    value: "",
  },
  reducers: {
    setUrl: (state, action) => {
      state.value = action.payload
    },
    clearUrl: (state) => {
      state.value = ""
    },
  },
})

export const { setUrl, clearUrl } = urlSlice.actions
export default urlSlice.reducer
