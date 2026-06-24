import { formatDate } from '@/shared/lib/formatDate';
import { PriceTag } from '@/shared/ui/PriceTag';
import { TrashIcon } from '@/shared/ui/TrashIcon';
import type { Product } from '../model/types';
import './ProductRow.css';

interface ProductRowProps {
  product: Product;
  orderTitle: string;
  orderDate: string;
  onDeleteClick: () => void;
}

export const ProductRow = ({ product, orderTitle, orderDate, onDeleteClick }: ProductRowProps) => {
  const guaranteeStart = formatDate(product.guarantee.start);
  const guaranteeEnd = formatDate(product.guarantee.end);

  return (
    <div className="product-row">
      <img className="product-row__photo" src={product.photo} alt={product.title} />
      <div className="product-row__main">
        <span className="product-row__title">{product.title}</span>
        <span className="product-row__type">{product.type}</span>
        <span className="product-row__serial">SN-{product.serialNumber}</span>
      </div>
      <span className="product-row__condition">{product.isNew ? 'New' : 'Used'}</span>
      <div className="product-row__guarantee">
        <span className="product-row__guarantee-short">
          {guaranteeStart.short} – {guaranteeEnd.short}
        </span>
        <span className="product-row__guarantee-full">
          {guaranteeStart.full} – {guaranteeEnd.full}
        </span>
      </div>
      <PriceTag prices={product.price} />
      <div className="product-row__order">
        <span className="product-row__order-title">{orderTitle}</span>
        <span className="product-row__order-date">{orderDate}</span>
      </div>
      <button
        type="button"
        className="product-row__delete btn btn-link"
        aria-label="Delete product"
        onClick={onDeleteClick}
      >
        <TrashIcon />
      </button>
    </div>
  );
};
