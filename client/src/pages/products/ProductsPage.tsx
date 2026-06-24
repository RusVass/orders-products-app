import { useMemo, useState } from 'react';
import { selectAllOrders } from '@/entities/order/model/selectors';
import {
  selectAllProducts,
  selectProductSpecs,
  selectProductTypes,
} from '@/entities/product/model/selectors';
import { productRemoved } from '@/entities/product/model/slice';
import { ProductRow } from '@/entities/product/ui/ProductRow';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { EmptyState } from '@/shared/ui/EmptyState';
import './ProductsPage.css';

const ALL = 'All';

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const orders = useAppSelector(selectAllOrders);
  const types = useAppSelector(selectProductTypes);
  const specs = useAppSelector(selectProductSpecs);

  const [selectedType, setSelectedType] = useState(ALL);
  const [selectedSpec, setSelectedSpec] = useState(ALL);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (selectedType === ALL || product.type === selectedType) &&
          (selectedSpec === ALL || product.specification === selectedSpec),
      ),
    [products, selectedType, selectedSpec],
  );

  const pendingProduct = products.find((product) => product.id === pendingDeleteId);

  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__heading">Products / {products.length}</h1>
        <label className="products-page__filter">
          Type:
          <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
            <option value={ALL}>{ALL}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="products-page__filter">
          Specification:
          <select value={selectedSpec} onChange={(event) => setSelectedSpec(event.target.value)}>
            <option value={ALL}>{ALL}</option>
            {specs.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visibleProducts.length === 0 ? (
        <EmptyState message="No products" />
      ) : (
        visibleProducts.map((product) => {
          const order = orders.find((candidate) => candidate.id === product.order);
          return (
            <ProductRow
              key={product.id}
              product={product}
              orderTitle={order?.title ?? ''}
              orderDate={order?.date ?? ''}
              onDeleteClick={() => setPendingDeleteId(product.id)}
            />
          );
        })
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
