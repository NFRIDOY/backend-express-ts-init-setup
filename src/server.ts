import mongoose from 'mongoose';
import { Server } from 'http'
import app from './app'
import config from './config';
import AppError from './errors/AppError';
const PORT = config.port;
const DATABASE_URL = config.database_url;

let server: Server;
async function main() {
    try {
        if (!DATABASE_URL) {
            throw new AppError(400, 'Database URL is not defined');
        }
        await mongoose.connect(DATABASE_URL as string);

        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled  

        server = app.listen(PORT, () => {
            console.log(`🚀 Server is online and ready — listening on 🛰️  port ${PORT}`)
        })
    } catch (error) {
        console.log("Error: ", error)
        throw new AppError(500, 'Error Occurred on main!');
    }
}

main();

process.on('unhandledRejection', () => {
    console.log(`😈 unahandledRejection is detected , Shutting Down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , Shutting Down ...`);
    process.exit(1);
});


// async function bootstrap() {
//     // ()()
//     server = app.listen(PORT, () => {
//         console.log(`Server App listening on port ${PORT}`)
//     })
// }

// bootstrap();