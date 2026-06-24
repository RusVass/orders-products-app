import { useMemo, useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectAllOrders } from '@/entities/order/model/selectors';
import { OrderRow } from '@/entities/order/ui/OrderRow';
import { selectAllProducts } from '@/entities/product/model/selectors';
import { useDeleteOrder } from '@/features/delete-order/useDeleteOrder';
import type { Price } from '@/shared/types/money';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { EmptyState } from '@/shared/ui/EmptyState';
import './OrdersPage.css';

const sumPricesBySymbol = (prices: Price[]): Price[] => {
  const totals = new Map<string, Price>();
  for (const price of prices) {
    const existing = totals.get(price.symbol);
    if (existing) {
      existing.value += price.value;
    } else {
      totals.set(price.symbol, { ...price });
    }
  }
  return [...totals.values()];
};

export const OrdersPage = () => {
  const orders = useAppSelector(selectAllOrders);
  const products = useAppSelector(selectAllProducts);
  const deleteOrder = useDeleteOrder();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const rows = useMemo(
    () =>
      orders.map((order) => {
        const orderProducts = products.filter((product) => product.order === order.id);
        return {
          order,
          productCount: orderProducts.length,
          totals: sumPricesBySymbol(orderProducts.flatMap((product) => product.price)),
        };
      }),
    [orders, products],
  );

  const pendingOrder = orders.find((order) => order.id === pendingDeleteId);

  return (
    <div className="orders-page">
      <h1 className="orders-page__heading">Orders / {orders.length}</h1>

      {rows.length === 0 ? (
        <EmptyState message="No orders" />
      ) : (
        rows.map(({ order, productCount, totals }) => (
          <OrderRow
            key={order.id}
            order={order}
            productCount={productCount}
            totals={totals}
            onDeleteClick={() => setPendingDeleteId(order.id)}
          />
        ))
      )}

      {pendingOrder && (
        <ConfirmModal
          title="Are you sure you want to delete this order?"
          message={pendingOrder.title}
          onConfirm={() => {
            deleteOrder(pendingOrder.id);
            setPendingDeleteId(null);
          }}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
};
