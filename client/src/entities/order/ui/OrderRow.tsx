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

export function OrderRow({ order, productCount, totals, onDeleteClick }: OrderRowProps) {
  return (
    <div className="order-row">
      <div className="order-row__main">
        <span className="order-row__title">{order.title}</span>
        <span className="order-row__count">{productCount} продукт</span>
        <span className="order-row__date">{order.date}</span>
      </div>
      <PriceTag prices={totals} />
      <button
        type="button"
        className="order-row__delete btn btn-link"
        aria-label="Удалить приход"
        onClick={onDeleteClick}
      >
        <TrashIcon />
      </button>
    </div>
  );
}
