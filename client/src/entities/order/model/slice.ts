import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order } from './types';

export interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderRemoved(state, action: PayloadAction<number>) {
      state.items = state.items.filter((order) => order.id !== action.payload);
    },
  },
});

export const { orderRemoved } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
