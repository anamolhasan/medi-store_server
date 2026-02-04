import express, { Request, Response } from 'express'
import cors from 'cors'
import config from './config'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { medicineRoutes } from './modules/medicine/medicine.route';
import globalErrorHandler from './middleware/globalErrorHandler';

const app = express()

// middleware
app.use(cors({

     origin: [config.better_auth.app_url!],
    credentials:true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Routes
app.all("/api/auth/*split", toNodeHandler(auth));

app.use('/api/v1/user', medicineRoutes)



app.get('/', (req, res) => {
    res.send("<h1>Medi Store server...</h1>")
})


// Error Handler
app.use(globalErrorHandler)
app.use((req:Request, res:Response) => {
    res.status(404).json({
        path:req.url,
        success:false,
        message:'Not Found!'
    })
})


export default app