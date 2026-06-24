import { configureStore } from '@reduxjs/toolkit';
import { ordersReducer } from '@/entities/order/model/slice';
import { orders } from '@/entities/order/model/seed';
import { productsReducer } from '@/entities/product/model/slice';
import { products } from '@/entities/product/model/seed';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
  preloadedState: {
    orders: { items: orders },
    products: { items: products },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
