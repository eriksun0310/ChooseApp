import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
interface Input {
  id: string;
  value: string;
  isNew: boolean;
  hasError: boolean;
}

interface WheelState {
  inputs: Input[];
}

const initialInput: Input = {
  id: uuidV4(),
  value: "",
  isNew: false,
  hasError: false,
};

const initialState: WheelState = {
  inputs: [initialInput],
};

export const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<Input>) => {
      state.inputs.push(action.payload);
    },
    updateInput: (
      state,
      action: PayloadAction<{ id: string; value: string; hasError: boolean }>
    ) => {
      const { id, value, hasError } = action.payload;
      const input = state.inputs.find((input) => input.id === id);
      if (input) {
        input.value = value;
        input.hasError = hasError;
      }
    },
    deleteInput: (state, action: PayloadAction<string>) => {
      state.inputs = state.inputs.filter((item) => item.id !== action.payload);
    },
    clearInputs: (state) => {
      state.inputs = [initialInput];
    },
  },
});

export const { addInput, deleteInput, clearInputs, updateInput } =
  wheelSlice.actions;
export default wheelSlice.reducer;
