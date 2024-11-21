import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizza } from '../../types';

interface CartItem {
  pizza: IPizza;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}


const initialState: CartState = {
  items: [],
  totalPrice: 0,
};



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IPizza>) => {
      const existingItem = state.items.find(item => item.pizza.id === action.payload.id);

      if (existingItem) {
        existingItem.amount++;
      } else {
        state.items.push({ pizza: action.payload, amount: 1 });
      }


      state.totalPrice = state.items.reduce(
        (total, item) => total + item.pizza.price * item.amount,
        0
      );
    },

  },
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
