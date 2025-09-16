import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blocks: [],
  block: null,
};

const BlockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    setBlocks: (state, action) => {
      state.blocks = action.payload;
    },
    setBlock: (state, action) => {
      state.block = action.payload
    }
  },
});

export const { setBlocks, setBlock } = BlockSlice.actions;
export default BlockSlice.reducer;
