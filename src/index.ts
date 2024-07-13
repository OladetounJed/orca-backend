import express, { Application } from 'express';
import cors from 'cors';

import { connectDBWithRetry } from './database';
import { config } from './config';
import { authRoute } from './routes/auth.route';
import { initializeBot } from './services/telegram/botService';
import { connectRedis } from './database/redisConnection';

const app: Application = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRoute());
// Initialize the bot
initializeBot();
connectRedis();

app.listen(config.server.port, async () => {
  await connectDBWithRetry();
});
