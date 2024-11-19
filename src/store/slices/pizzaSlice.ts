import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizza } from '../../types';
import { addNewPizza, fetchPizza } from '../thunks/pizzaThunks.ts';
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

export const selectFetchPizzaLoading = (state: RootState) =>
  state.pizza.loadings.fetching;

export const selectAllPizza = (state: RootState) => state.pizza.typesOfPizza;


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

       .addCase(fetchPizza.pending, (state) =>  {
         state.loadings.fetching = true;
       })
       .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<IPizza[]>) =>  {
         state.loadings.fetching = false;
         state.typesOfPizza = action.payload
       })
       .addCase(fetchPizza.rejected, (state) =>  {
         state.loadings.fetching = false;
       })


   }
 });

export const pizzaReducer = pizzaSlice.reducer;
export const {} =pizzaSlice.actions;