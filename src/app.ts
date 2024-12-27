import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import session, { SessionOptions, SessionData } from 'express-session';

import { json } from 'body-parser';
import { ValidationErrorItem } from 'sequelize';

import expressSession from 'express-session';
import moviesRoute from './routes/movie';
import userRoute from './routes/user';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.set('trust proxy', true);
// app.use(cookieSession({
//     signed: false,
//     secure: false,
//     maxAge:  10000,
//     httpOnly: false
// }));
app.use(expressSession({
    secret: 'jj'
}));
app.use('/users', userRoute);
app.use('/movies', moviesRoute);

app.all('*', async (req, res) => {
    throw new Error('Not Found');
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error Handler Middleware', error);
    if (error instanceof Error) {
        res.status(400).send({ errors: getErrorFormat(error) });
    } else {
        res.status(400).send({ errors: [{ message: 'internal server error' }] });
    }
});


function getErrorFormat(error: { errors?: ValidationErrorItem[], message: string }): Array<AppError> {
    var e: Array<AppError> = [];
    error.errors?.forEach((err) => {
        e.push({
            message: err.message,
            field: err.path || '',
            value: err.value || ''
        });
    });
    if (e && e.length === 0) {
        e = [{ message: error?.message || 'Internal server error' }];
    }
    return e;
}

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
