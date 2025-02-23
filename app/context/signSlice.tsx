import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SignState {
  cusSign: string | null
  serSign: string | null
  pdfPath: string | null
}

const initialState: SignState = {
  cusSign: null,
  serSign: null,
  pdfPath: null,
}

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    setCusSign: (state, action: PayloadAction<string | null>) => {
      state.cusSign = action.payload
    },
    setSerSign: (state, action: PayloadAction<string | null>) => {
      state.serSign = action.payload
    },
    setPdfPath: (state, action: PayloadAction<string | null>) => {
      state.pdfPath = action.payload
    },
    clearSigns: (state) => {
      state.cusSign = null
      state.serSign = null
      state.pdfPath = null
    },
  },
})

export const { setCusSign, setSerSign, setPdfPath, clearSigns } =
  signSlice.actions
export default signSlice.reducer
