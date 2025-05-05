import express, { Request, Response } from 'express';
const app = express()

// Persers
app.use(express.json()); // to recive json object
app.use(express.text()); // to recive text
 

app.get('/', (req, res) => {
    res.send('Hello World From Backend Server.')
})

app.post('/', (req: Request, res: Response) => {
    const reqObj = req.body;
    console.log(reqObj);
    res.json({
        code: '200',
        status: 'Ok',
        message : "Successfully Recived Data",
    })
})

export default app
