import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizzaForm } from '../../types';
import axiosApi from '../../AxiosApi.ts';

export const addNewPizza = createAsyncThunk(
  "contacts/addNewContact",
  async (contact: IPizzaForm) => {
    const response = await axiosApi.post("/pizza.json", contact);
    return response.data;
  },
);