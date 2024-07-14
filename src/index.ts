import express, { Application } from 'express';
import cors from 'cors';

import { connectDBWithRetry } from './database';
import { config } from './config';
import authRoute from './routes/auth.route';
import { initializeBot } from './services/telegram/botService';
import { connectRedis } from './database/redisConnection';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';

const app: Application = express();
const bot: TelegramBot = initializeBot();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRoute);

app.post(`/bot${config.telegram.token}`, bodyParser.json(), (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
connectRedis();

app.listen(config.server.port, async () => {
  await connectDBWithRetry();
});
