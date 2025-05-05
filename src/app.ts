import express, { Request, Response } from 'express';
const app = express()

// Persers
app.use(express.json());
 

app.get('/', (req, res) => {
    res.send('Hello World From Backend Server.')
})

app.post('/', (req: Request, res: Response) => {
    const reqObj = req.body;
    console.log(reqObj);
    res.send("Data Recived");
})

export default app
