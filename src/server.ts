import mongoose from 'mongoose';
import { Server } from 'http'
import app from './app'
import config from './config';
const PORT = config.port;
const DATABASE_URL = config.database_url;

let server: Server;
async function main() {
    try {
        if (!DATABASE_URL) {
            throw new Error('Database URL is not defined');
        }
        await mongoose.connect(DATABASE_URL as string);

        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled  
        
        app.listen(PORT, () => {
            console.log(`Server App listening on port ${PORT}`)
        })
    } catch (error) {
        console.log("Error: ", error)
        // throw new Error('Error Occurred!');
    }
}

main();

// async function bootstrap() {
//     // ()()
//     server = app.listen(PORT, () => {
//         console.log(`Server App listening on port ${PORT}`)
//     })
// }

// bootstrap();