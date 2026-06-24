import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './types';

export interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productRemoved(state, action: PayloadAction<number>) {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
    productsRemovedByOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter((product) => product.order !== action.payload);
    },
  },
});

export const { productRemoved, productsRemovedByOrder } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
