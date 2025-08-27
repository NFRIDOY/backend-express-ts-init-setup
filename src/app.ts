import express, { Request, Response } from 'express';
import cors from 'cors';
export const app = express()

// Middlewares
import logger from './middleware/logger'
import routes from './router/routes';
// import { userRoute } from './module/common/user/user.route';

// Persers
app.use(express.json()); // to recive json object
app.use(cors())
app.use(express.text()); // to recive text

// Routes
routes();
// app.use("/user", userRoute)


app.get('/', logger, (req, res) => {
    res.send('Hello World From Backend Server.')
})

app.post('/', logger, (req: Request, res: Response) => {
    const reqObj = req.body;
    console.log(reqObj);
    res.json({
        success: true,
        code: '200',
        status: 'Ok',
        message: "Successfully Recived Data",
    })
})

export default app
