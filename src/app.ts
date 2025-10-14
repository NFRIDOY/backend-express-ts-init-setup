import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
export const app = express()
import path from 'path';

// Middlewares
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './routes';

// Persers
app.use(express.json()); // to recive json object
app.use(cors())
// app.use(express.text()); // to recive text

// Routes
// routes();
app.use("/api/v1", router)
// app.use("/api/user", userRoute)
// app.use("/api/student", logger, studentRoute)


app.get('/', (req, res) => {
    // res.send('Hello World From Backend Server.')
    res.sendFile(path.join(process.cwd(), 'index.html'));

})
app.get('/api.html', (req, res) => {
    // res.send('Hello World From Backend Server.')
    res.sendFile(path.join(process.cwd(), 'api.html'));

})

app.post('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        code: '200',
        status: 'Ok',
        message: "Successfully Recived Data",
    })
})

// Global Error Handler
app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
