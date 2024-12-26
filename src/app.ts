import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import session, { SessionOptions } from 'express-session';

import { json } from 'body-parser';
import { ValidationErrorItem } from 'sequelize';


import moviesRoute from './routes/movie';
import userRoute from './routes/user';

const app = express();
app.set('trust proxy', true);
app.use(json());


app.use(cookieSession({
    keys: ['key1', 'key2'],
    secure: false
}));

app.use('/users', userRoute);
app.use('/movies', moviesRoute);



app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error Handler Middleware', error.name);
    if (!error) {
        next();
    }
    if (error instanceof Error) {
        res.status(400).send({ errors: getErrorFormat(error) });
    } else {
        res.status(400).send({ errors: [{ message: 'internal server error' }] });
    }
});


app.all('*', async (req, res) => {
    throw new Error('Not Found');
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


interface AppError {
    message: string;
    field?: string;
    value?: string;

}


export { app };
