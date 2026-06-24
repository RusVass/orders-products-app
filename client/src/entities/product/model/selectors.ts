import type { ProductsState } from './slice';

interface State {
  products: ProductsState;
}

export const selectAllProducts = (state: State) => state.products.items;

export const selectProductsByOrderId = (state: State, orderId: number) =>
  state.products.items.filter((product) => product.order === orderId);
