# Installing

```bash 
npm init -y 
```
```bash
npm install express
npm install -D typescript
npm i -D nodemon
npm i dotenv
npm i ts-node-dev
npm install zod
npm i bcrypt
npm i jsonwebtoken 
```
### 64 Bytes toString genaration using node
```bash
require('crypto').randomBytes(64).toString('hex')
```
# Config TS
Run
```bash
tsc --init
```
Update
- "rootDir": "./src/",  
- "outDir": "./dist",

# Besic File Structure
```txt
|.env
|-dist                  # after build
    |-server.js  
|-src
    |-app.ts
    |-server.ts
    |-app
        |-config        # Centralized configuration
            |-env.config.ts     # Loads and validates .env variables
            |-db.config.ts      # Database connection setup
            |-logger.config.ts  # Winston or similar logging setup
        |-modules       # Business logic and route handlers
            |-user/     # Example module
                |-user.types.ts
                |-user.validation.ts
                |-user.model.ts
                |-user.controller.ts
                |-user.service.ts
                |-user.routes.ts

        |-middleware    # Express middlewares
            |-errorHandler.ts
            |-requestLogger.ts
            |-authMiddleware.ts
        |-utils         # Reusable helpers
        |-types         # Global types/interfaces
```

# Config: package.json 
* install `ts-node-dev` use this package and copy paste this on the `script` on `package.json`
```json
"scripts": {
    "start:dev": "nodemon ./dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
  },
```
# Run
```bash
npm run dev
```

# Dev
## app.ts


Inport
```javascript
// Persers
import express, { Request, Response } from 'express';
import cors from 'cors';
export const app = express()
```
Middlewares
```javascript
// Middlewares
import logger from './middleware/logger'
```
Persers
```javascript
// Persers
app.use(express.json()); // to recive json object
app.use(cors())
app.use(express.text()); // to recive text
```
Routes
```javascript
// Routes
app.use("/api/user", userRoute)
app.use("/api/student", logger, studentRoute)
```
Make a beautifull `index.html`
```javascript
app.get('/', (req, res) => {
// res.send('Hello World From Backend Server.')
res.sendFile(path.join(process.cwd(), 'index.html'));
})
```
[under dev: don't use] Global Error Handler
```javascript
// src/app/middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.method}] ${req.originalUrl}`)
  next()
}
```

## server.ts
```javascript
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
```



# eslint
# prettier
# biomejs
# Learning
## Overlook
- QueryBuilder
