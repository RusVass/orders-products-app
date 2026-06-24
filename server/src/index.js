import { createServer } from 'http';
import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();
app.use(cors({ origin: CLIENT_URL }));
app.get('/health', (_req, res) => res.send('ok'));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: CLIENT_URL } });

let sessionCount = 0;

io.on('connection', (socket) => {
  sessionCount++;
  io.emit('sessions:count', sessionCount);

  socket.on('disconnect', () => {
    sessionCount--;
    io.emit('sessions:count', sessionCount);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
