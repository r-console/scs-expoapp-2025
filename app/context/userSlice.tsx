import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  id: string | null
  name: string
  branch: string
  username: string
  last_invoice_id: string | null
}

const initialState: UserState = {
  id: null,
  name: "",
  branch: "",
  username: "",
  last_invoice_id: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.branch = action.payload.branch
      state.username = action.payload.username
      state.last_invoice_id = action.payload.last_invoice_id
    },
    clearUser: (state) => {
      state.id = null
      state.name = ""
      state.branch = ""
      state.username = ""
      state.last_invoice_id = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
