import type { Product } from './types';

// Diversified across 4 types (Monitor, Smartphone, Laptop, Tablet) so the
// Products page's type/specification filters are actually meaningful during
// manual QA - the original ported app.js data had two near-identical
// "Product 1" / Monitors entries, which made every filter a no-op.
export const products: Product[] = [
  {
    id: 1,
    serialNumber: 1001,
    isNew: true,
    photo: '/images/products/monitor.svg',
    title: 'Dell UltraSharp Monitor',
    type: 'Monitor',
    specification: '27 inch, IPS, 4K',
    guarantee: {
      start: '2024-01-15 10:00:00',
      end: '2026-01-15 10:00:00',
    },
    price: [
      { value: 450, symbol: 'USD', isDefault: false },
      { value: 18500, symbol: 'UAH', isDefault: true },
    ],
    order: 1,
    date: '2024-01-15 10:00:00',
  },
  {
    id: 2,
    serialNumber: 1002,
    isNew: true,
    photo: '/images/products/smartphone.svg',
    title: 'iPhone 15',
    type: 'Smartphone',
    specification: '128GB, Blue',
    guarantee: {
      start: '2024-01-15 10:00:00',
      end: '2026-01-15 10:00:00',
    },
    price: [
      { value: 799, symbol: 'USD', isDefault: false },
      { value: 32800, symbol: 'UAH', isDefault: true },
    ],
    order: 1,
    date: '2024-01-15 10:00:00',
  },
  {
    id: 3,
    serialNumber: 1003,
    isNew: true,
    photo: '/images/products/laptop.svg',
    title: 'MacBook Air',
    type: 'Laptop',
    specification: 'M2, 16GB RAM, 512GB SSD',
    guarantee: {
      start: '2024-01-15 10:00:00',
      end: '2026-01-15 10:00:00',
    },
    price: [
      { value: 1299, symbol: 'USD', isDefault: false },
      { value: 53300, symbol: 'UAH', isDefault: true },
    ],
    order: 1,
    date: '2024-01-15 10:00:00',
  },
  {
    id: 4,
    serialNumber: 1004,
    isNew: true,
    photo: '/images/products/tablet.svg',
    title: 'iPad',
    type: 'Tablet',
    specification: '11 inch, Wi-Fi, 256GB',
    guarantee: {
      start: '2024-01-15 10:00:00',
      end: '2026-01-15 10:00:00',
    },
    price: [
      { value: 649, symbol: 'USD', isDefault: false },
      { value: 26600, symbol: 'UAH', isDefault: true },
    ],
    order: 1,
    date: '2024-01-15 10:00:00',
  },
  {
    id: 5,
    serialNumber: 1005,
    isNew: true,
    photo: '/images/products/monitor.svg',
    title: 'LG UltraWide Monitor',
    type: 'Monitor',
    specification: '34 inch, IPS, QHD',
    guarantee: {
      start: '2024-03-10 10:00:00',
      end: '2026-03-10 10:00:00',
    },
    price: [
      { value: 599, symbol: 'USD', isDefault: false },
      { value: 24600, symbol: 'UAH', isDefault: true },
    ],
    order: 2,
    date: '2024-03-10 10:00:00',
  },
  {
    id: 6,
    serialNumber: 1006,
    isNew: true,
    photo: '/images/products/smartphone.svg',
    title: 'Samsung Galaxy S23',
    type: 'Smartphone',
    specification: '256GB, Black',
    guarantee: {
      start: '2024-03-10 10:00:00',
      end: '2026-03-10 10:00:00',
    },
    price: [
      { value: 899, symbol: 'USD', isDefault: false },
      { value: 36900, symbol: 'UAH', isDefault: true },
    ],
    order: 2,
    date: '2024-03-10 10:00:00',
  },
  {
    id: 7,
    serialNumber: 1007,
    isNew: true,
    photo: '/images/products/laptop.svg',
    title: 'Dell XPS 13',
    type: 'Laptop',
    specification: 'Intel i7, 16GB RAM, 1TB SSD',
    guarantee: {
      start: '2024-03-10 10:00:00',
      end: '2026-03-10 10:00:00',
    },
    price: [
      { value: 1099, symbol: 'USD', isDefault: false },
      { value: 45100, symbol: 'UAH', isDefault: true },
    ],
    order: 2,
    date: '2024-03-10 10:00:00',
  },
  {
    id: 8,
    serialNumber: 1008,
    isNew: true,
    photo: '/images/products/tablet.svg',
    title: 'Samsung Galaxy Tab S9',
    type: 'Tablet',
    specification: '10.4 inch, Wi-Fi, 128GB',
    guarantee: {
      start: '2024-03-10 10:00:00',
      end: '2026-03-10 10:00:00',
    },
    price: [
      { value: 549, symbol: 'USD', isDefault: false },
      { value: 22500, symbol: 'UAH', isDefault: true },
    ],
    order: 2,
    date: '2024-03-10 10:00:00',
  },
];
