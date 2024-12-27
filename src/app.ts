import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { SessionData } from 'express-session';

import { json } from 'body-parser';

import expressSession from 'express-session';
import moviesRoute from './routes/movie';
import userRoute from './routes/user';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.set('trust proxy', true);

app.use(expressSession({
    secret: 'sessionTopSecret'
}));
app.use('/users', userRoute);
app.use('/movies', moviesRoute);

app.all('*', async (req, res) => {
    throw new Error('Not Found');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log('Error Handler Middleware', error);
    if (error instanceof Error) {
        res.status(400).send({ error: error.message });
    } else if (error instanceof Array) {
        res.status(400).send({ error: error });
    }
});


process.on('uncaughtException', function (err) {
    console.log('O uncaughtException : ', err);
});

interface CustomSessionData extends SessionData {
    jwt?: number;

    httpOnly?: true; secure?: false; signed?: false; maxAge?: number;
    originalMaxAge?: number;
}

interface AppError {
    message: string;
    field?: string;
    value?: string;

}


export { app };
