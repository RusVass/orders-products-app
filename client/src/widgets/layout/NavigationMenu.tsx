import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/orders', label: 'Orders' },
  { to: '/groups', label: 'Groups' },
  { to: '/products', label: 'Products' },
  { to: '/users', label: 'Users' },
  { to: '/settings', label: 'Settings' },
];

export const NavigationMenu = () => {
  return (
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
  );
};
