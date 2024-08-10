import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  imageUrl: "",
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.imageUrl = action.payload.imageUrl;
    },
  },
});

export const { setPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
