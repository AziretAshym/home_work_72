import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../AxiosApi.ts';

export const sendOrder = createAsyncThunk(
  'orders/sendOrder',
  async (order: any) => {
    try {
      const response = await axiosApi.post('/orders.json', order);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
);


export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const response = await axiosApi("orders.json");

    if (response.data) {
      const ordersInObj = response.data;
      return Object.keys(ordersInObj).map((orderId) => {
        return {
          ...ordersInObj[orderId],
          id: orderId,
        };
      });
    }
    return [];
  },
);