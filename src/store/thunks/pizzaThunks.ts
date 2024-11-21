import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizza, IPizzaApi, IPizzaForm } from '../../types';
import axiosApi from '../../AxiosApi.ts';

export const addNewPizza = createAsyncThunk(
  "pizza/addNewPizza",
  async (pizza: IPizzaForm) => {
    const response = await axiosApi.post("/pizza.json", pizza);
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

export const deletePizza = createAsyncThunk(
  "pizza/deletePizza",
  async (pizzaId: string) => {
    await axiosApi.delete(`/pizza/${pizzaId}.json`);
    return pizzaId;
  }
);


export const editPizza = createAsyncThunk(
  "pizza/editPizza",
  async ({ id, updatedPizza }: { id: string; updatedPizza: IPizzaForm }) => {
    await axiosApi.put(`/pizza/${id}.json`, updatedPizza);
    return { id, updatedPizza };
  }
);
