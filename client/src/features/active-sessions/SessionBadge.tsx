import { useActiveSessions } from './useActiveSessions';
import './SessionBadge.css';

export const SessionBadge = () => {
  const count = useActiveSessions();

  return (
    <div className="session-badge">
      <span className="session-badge__dot" />
      {count} online
    </div>
  );
};
