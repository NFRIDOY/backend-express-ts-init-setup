import express, { Request, Response } from 'express';
const app = express()

import logger from './middleware/logger'

// Persers
app.use(express.json()); // to recive json object
app.use(express.text()); // to recive text


app.get('/', logger, (req, res) => {
    res.send('Hello World From Backend Server.')
})

app.post('/', logger, (req: Request, res: Response) => {
    const reqObj = req.body;
    console.log(reqObj);
    res.json({
        code: '200',
        status: 'Ok',
        message: "Successfully Recived Data",
    })
})

export default app
