export type CurrencySymbol = 'USD' | 'UAH';

export interface Price {
  value: number;
  symbol: CurrencySymbol;
  isDefault: boolean;
}
