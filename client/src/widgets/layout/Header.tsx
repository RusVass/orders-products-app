import { SessionBadge } from '@/features/active-sessions/SessionBadge';
import { useClock } from '@/shared/lib/useClock';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});

export function Header() {
  const now = useClock();

  return (
    <header className="header">
      <div className="header__brand">INVENTORY</div>
      <input className="header__search form-control" type="search" placeholder="Поиск" />
      <SessionBadge />
      <div className="header__clock">
        <span className="header__clock-date">{dateFormatter.format(now)}</span>
        <span className="header__clock-time">{timeFormatter.format(now)}</span>
      </div>
    </header>
  );
}
