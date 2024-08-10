import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemonSlice";
import selectedIdReducer from "./slices/selectedIdSlice";

export default configureStore({
  reducer: { pokemon: pokemonReducer, selectedId: selectedIdReducer },
});
