import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizza, IPizzaForm } from '../../types';
import { addNewPizza, deletePizza, editPizza, fetchPizza } from '../thunks/pizzaThunks.ts';
import { RootState } from '../../app/store.ts';

interface pizzaState {
  typesOfPizza: IPizza[];
  loadings: {
    add: boolean;
    fetching: boolean;
    delete: boolean;
    edit: boolean;
  }
}

const initialState: pizzaState = {
  typesOfPizza: [],
  loadings: {
    add: false,
    fetching: false,
    delete: false,
    edit: false,
  },
}

export const selectAddPizzaLoading = (state: RootState) =>
  state.pizza.loadings.add;

export const selectFetchPizzaLoading = (state: RootState) =>
  state.pizza.loadings.fetching;

export const selectAllPizza = (state: RootState) => state.pizza.typesOfPizza;

export const selectPizzaById = (state: RootState, pizzaId: string) => {
  return state.pizza.typesOfPizza.find((pizza) => pizza.id === pizzaId) || null;
};


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

       .addCase(deletePizza.pending, (state) => {
         state.loadings.delete = true;
       })
       .addCase(deletePizza.fulfilled, (state) => {
         state.loadings.delete = false;
       })
       .addCase(deletePizza.rejected, (state) => {
         state.loadings.delete = false;
       })

       .addCase(editPizza.pending, (state) => {
         state.loadings.edit = true;
       })
       .addCase(editPizza.fulfilled, (state, action:PayloadAction<{id: string, updatedPizza: IPizzaForm}>) => {
         state.loadings.edit = false;
         state.typesOfPizza = state.typesOfPizza.map(pizza =>
           pizza.id === action.payload.id
             ? { id: action.payload.id, ...action.payload.updatedPizza }
             : pizza
         );
       })
       .addCase(editPizza.rejected, (state) => {
         state.loadings.edit = false;
       })




   }
 });

export const pizzaReducer = pizzaSlice.reducer;
