import type { OrdersState } from './slice';

interface State {
  orders: OrdersState;
}

export const selectAllOrders = (state: State) => state.orders.items;

export const selectOrderById = (state: State, id: number) =>
  state.orders.items.find((order) => order.id === id);
