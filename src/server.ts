const mongoose = require('mongoose');
import { Server } from 'http'
import app from './app'
const PORT = 5000;

let server: Server;
async function main() {
    await mongoose.connect(process.env.DALABASE_URL);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

async function bootstrap() {
    // ()()
    server = app.listen(PORT, () => {
        console.log(`Server App listening on port ${PORT}`)
    })
}

bootstrap();