import express, { Request, Response } from 'express';
import cors from 'cors';
export const app = express()

// Middlewares
import logger from './middleware/logger'
import routes from './router/routes';
import path from 'path';
import { userRoute } from './module/common/user/user.route';
import { studentRoute } from './module/student/student.route';
// import { userRoute } from './module/common/user/user.route';

// Persers
app.use(express.json()); // to recive json object
app.use(cors())
app.use(express.text()); // to recive text

// Routes
// routes();
app.use("/api/user", userRoute)
app.use("/api/student", logger, studentRoute)


app.get('/', (req, res) => {
    // res.send('Hello World From Backend Server.')
    res.sendFile(path.join(process.cwd(), 'index.html'));

})

app.post('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        code: '200',
        status: 'Ok',
        message: "Successfully Recived Data",
    })
})

export default app
