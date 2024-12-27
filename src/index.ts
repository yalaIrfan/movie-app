
import { app } from './app';
import mongoose from 'mongoose';
const port = process.env.PORT || 3000;
process.env.DB_PASSWORD = 'wEPnpoWC4mazPluT';

let start = async () => {
    // if (!process.env.JWT_KEY)` {
    //     throw new Error('JWT_KEY must be defined');
    // }
    // if (!process.env.MONGO_URI) {
    //     throw new Error('MONGO_URI must be defined');
    // }

    // connect db ere..
    try {
        await mongoose.connect(`mongodb+srv://mohammadirfany93:${process.env.DB_PASSWORD}@movie.lyelo.mongodb.net/?retryWrites=true&w=majority&appName=movielobby1`);
        console.log('Connected to MongoDb');
        // await sequelizePg.authenticate();
    } catch (err) {
        console.error(err);
    }

    app.listen(port, () => {
        console.log(`App is Listening on port ${port}`);
    });
};

start();
