import express from 'express'
import cors from 'cors'
import config from './config'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

const app = express()

// middleware
app.use(cors({
    origin:config.better_auth.app_url!,
    credentials:true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Routes
app.all("/api/auth/*split", toNodeHandler(auth));

app.get('/', (req, res) => {
    res.send("<h1>Medi Store server...</h1>")
})

export default app