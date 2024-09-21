import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

const Server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server: Server });

wss.on('connection', (ws: WebSocket) => {
  console.log(ws);
});