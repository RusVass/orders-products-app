import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:4500';

export function useActiveSessions() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('sessions:count', setCount);

    return () => {
      socket.disconnect();
    };
  }, []);

  return count;
}
