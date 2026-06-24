import type { Price } from '@/shared/types/money';
import './shared-ui.css';

interface PriceTagProps {
  prices: Price[];
}

export const PriceTag = ({ prices }: PriceTagProps) => {
  if (prices.length === 0) {
    return null;
  }

  const sorted = [...prices].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));

  return (
    <div className="price-tag">
      {sorted.map((price) => (
        <span
          key={price.symbol}
          className={`price-tag__amount${price.isDefault ? ' price-tag__amount--default' : ''}`}
        >
          {price.value} {price.symbol}
        </span>
      ))}
    </div>
  );
};
