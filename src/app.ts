import 'reflect-metadata'
import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm';
import config from  './config/database'
import AppRouters from '../src/routers/index'

const app = express();

app.use(express.json())

const PORT = 3000;

AppRouters(app)

createConnection(config).then((_connection) => {
    app.listen(PORT, () => {
        console.log(`App rodando em http://localhost:${PORT}`)
    });
}).catch((err) => {
    process.exit(1)
})



