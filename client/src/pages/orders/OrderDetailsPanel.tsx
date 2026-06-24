import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectOrderById } from '@/entities/order/model/selectors';
import { selectProductsByOrderId } from '@/entities/product/model/selectors';
import { productRemoved } from '@/entities/product/model/slice';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { EmptyState } from '@/shared/ui/EmptyState';
import { TrashIcon } from '@/shared/ui/TrashIcon';
import './OrderDetailsPanel.css';

export const OrderDetailsPanel = () => {
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const id = Number(orderId);
  const order = useAppSelector((state) => selectOrderById(state, id));
  const products = useAppSelector((state) => selectProductsByOrderId(state, id));
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  const pendingProduct = products.find((product) => product.id === pendingDeleteId);

  return (
    <div className="order-details-panel">
      <div className="order-details-panel__header">
        <h2 className="order-details-panel__title">{order.title}</h2>
        <Link to="/orders" className="order-details-panel__close" aria-label="Close">
          ×
        </Link>
      </div>

      {products.length === 0 ? (
        <EmptyState message="No products" />
      ) : (
        products.map((product) => (
          <div key={product.id} className="order-details-panel__item">
            <img className="order-details-panel__photo" src={product.photo} alt={product.title} />
            <div className="order-details-panel__info">
              <span className="order-details-panel__item-title">{product.title}</span>
              <span className="order-details-panel__serial">SN-{product.serialNumber}</span>
            </div>
            <span className="order-details-panel__condition">{product.isNew ? 'New' : 'Used'}</span>
            <button
              type="button"
              className="order-details-panel__delete btn btn-link"
              aria-label="Delete product"
              onClick={() => setPendingDeleteId(product.id)}
            >
              <TrashIcon />
            </button>
          </div>
        ))
      )}

      {pendingProduct && (
        <ConfirmModal
          title="Are you sure you want to delete this product?"
          message={pendingProduct.title}
          onConfirm={() => {
            dispatch(productRemoved(pendingProduct.id));
            setPendingDeleteId(null);
          }}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
};
