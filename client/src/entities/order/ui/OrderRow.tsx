import { Link, useParams } from 'react-router-dom';
import type { Price } from '@/shared/types/money';
import { PriceTag } from '@/shared/ui/PriceTag';
import { TrashIcon } from '@/shared/ui/TrashIcon';
import type { Order } from '../model/types';
import './OrderRow.css';

interface OrderRowProps {
  order: Order;
  productCount: number;
  totals: Price[];
  onDeleteClick: () => void;
}

export const OrderRow = ({ order, productCount, totals, onDeleteClick }: OrderRowProps) => {
  const { orderId } = useParams();
  const isActive = Number(orderId) === order.id;

  return (
    <div className="order-row">
      <Link to={`/orders/${order.id}`} className="order-row__link">
        <div className="order-row__main">
          <span className="order-row__title">{order.title}</span>
          <span className="order-row__count">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </span>
          <span className="order-row__date">{order.date}</span>
        </div>
        <PriceTag prices={totals} />
      </Link>
      <button
        type="button"
        className="order-row__delete btn btn-link"
        aria-label="Delete order"
        onClick={onDeleteClick}
      >
        <TrashIcon />
      </button>
      {isActive && (
        <span className="order-row__indicator" aria-hidden="true">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </span>
      )}
    </div>
  );
};
