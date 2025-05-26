import express, { Request, Response } from 'express';
import { routes } from './routes';
import { removePoweredByHeader } from './middleware';
import cors from 'cors';

const app = express()

app.use(cors())

app.use(express.json())

// Middleware
app.use(removePoweredByHeader)

// Routes
app.use('/posts', routes)

// Testing Endpoint
app.get('/ping', (req: Request, res: Response) => { 
    res.send('pong')
})

//console.log('Routes: ', routes)  testing purposes only


export default app;