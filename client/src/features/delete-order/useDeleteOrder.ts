import { useAppDispatch } from '@/app/hooks';
import { orderRemoved } from '@/entities/order/model/slice';
import { productsRemovedByOrder } from '@/entities/product/model/slice';

export const useDeleteOrder = () => {
  const dispatch = useAppDispatch();

  return (orderId: number) => {
    dispatch(orderRemoved(orderId));
    dispatch(productsRemovedByOrder(orderId));
  };
};
