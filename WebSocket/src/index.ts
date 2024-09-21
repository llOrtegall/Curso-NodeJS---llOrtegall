import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import morgan from 'morgan';

const app = express();

const port = 3000;

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const ws = app.listen(port, () => { console.log(`Server started on http://localhost:${port}`) });

const wss = new WebSocketServer({ server: ws });

wss.on('connection', (socket, request) => {

  console.log('un cliente se ha conectado');

  socket.on('message', (message: Buffer) => {
    const msgData = JSON.parse(message.toString());

    socket.send(JSON.stringify({ msgData }));
  });

  socket.on('close', () => {
    console.log('Client disconnected');
    socket.close();
  });
})