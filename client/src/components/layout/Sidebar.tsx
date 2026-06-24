import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/orders', label: 'Приход' },
  { to: '/products', label: 'Продукты' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
