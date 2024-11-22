import { configureStore } from '@reduxjs/toolkit';
import { pizzaReducer } from '../store/slices/pizzaSlice.ts';
import { cartReducer } from '../store/slices/ordersSlice.ts';

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    orders: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
