import { createSlice } from '@reduxjs/toolkit';
import { IPizza } from '../../types';
import { addNewPizza } from '../thunks/pizzaThunks.ts';
import { RootState } from '../../app/store.ts';

interface pizzaState {
  typesOfPizza: IPizza[];
  loadings: {
    add: boolean;
    fetching: boolean;
  }
}

const initialState: pizzaState = {
  typesOfPizza: [],
  loadings: {
    add: false,
    fetching: false,
  },
}

export const selectAddPizzaLoading = (state: RootState) =>
  state.pizza.loadings.add;


 const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       .addCase(addNewPizza.pending, (state) =>  {
         state.loadings.add = true;
       })
       .addCase(addNewPizza.fulfilled, (state) =>  {
         state.loadings.add = false;
       })
       .addCase(addNewPizza.rejected, (state) =>  {
         state.loadings.add = false;
       })
   }
 });

export const pizzaReducer = pizzaSlice.reducer;
export const {} =pizzaSlice.actions;