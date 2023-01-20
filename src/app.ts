import express, { Express } from "express";
import cors from 'cors';

import { loadEnvs, connectDb, disconnectDB } from './config';

loadEnvs()

const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/health", (_req, res) => res.send("Tudo certo"));

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;