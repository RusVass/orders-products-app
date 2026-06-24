import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/widgets/layout/AppLayout';
import { OrdersPage } from '@/pages/orders/OrdersPage';
import { OrderDetailsPanel } from '@/pages/orders/OrderDetailsPanel';
import { ProductsPage } from '@/pages/products/ProductsPage';
import { PlaceholderPage } from '@/shared/ui/PlaceholderPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/orders" replace />} />
        <Route path="orders" element={<OrdersPage />}>
          <Route path=":orderId" element={<OrderDetailsPanel />} />
        </Route>
        <Route path="groups" element={<PlaceholderPage title="Groups" />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="users" element={<PlaceholderPage title="Users" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Route>
    </Routes>
  );
};
