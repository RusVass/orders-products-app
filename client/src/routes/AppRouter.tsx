import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/widgets/layout/AppLayout';
import { OrdersPage } from '@/pages/orders/OrdersPage';
import { ProductsPage } from '@/pages/products/ProductsPage';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/orders" replace />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}
