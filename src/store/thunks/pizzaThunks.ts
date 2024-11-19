import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizza, IPizzaApi, IPizzaForm } from '../../types';
import axiosApi from '../../AxiosApi.ts';

export const addNewPizza = createAsyncThunk(
  "pizza/addNewPizza",
  async (contact: IPizzaForm) => {
    const response = await axiosApi.post("/pizza.json", contact);
    return response.data;
  },
);

export const fetchPizza = createAsyncThunk<IPizza[], void>(
  "pizza/fetchPizza",
  async () => {
    const response = await axiosApi.get<IPizzaApi | null>("pizza.json");

    if (response.data) {
      const pizzaInObj = response.data;
      return Object.keys(pizzaInObj).map((pizzaId) => {
        return {
          ...pizzaInObj[pizzaId],
          id: pizzaId,
        };
      });
    }
    return [];
  },
);