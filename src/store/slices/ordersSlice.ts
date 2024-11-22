import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizza } from '../../types';
import { editPizza } from '../thunks/pizzaThunks.ts';
import { fetchOrders } from '../thunks/orderThunks.ts';

interface CartItem extends IPizza {
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  loading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IPizza>) => {
      const pizza = action.payload;
      const existingPizza = state.items.find((item) => item.id === pizza.id);
      if (existingPizza) {
        existingPizza.amount += 1;
      } else {
        state.items.push({ ...pizza, amount: 1 });
      }
      state.totalPrice += Number(pizza.price);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const pizzaId = action.payload;
      const pizzaIndex = state.items.findIndex((item) => item.id === pizzaId);
      if (pizzaIndex !== -1) {
        const pizza = state.items[pizzaIndex];
        state.totalPrice -= Number(pizza.price);
        if (pizza.amount > 1) {
          pizza.amount -= 1;
        } else {
          state.items.splice(pizzaIndex, 1);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers (builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {})
  }
});

export const { addToCart, removeFromCart, clearCart } = ordersSlice.actions;
export const cartReducer = ordersSlice.reducer;
