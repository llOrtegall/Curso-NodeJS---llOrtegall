import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import morgan from 'morgan';

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

})