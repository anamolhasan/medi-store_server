import express from 'express'
import cors from 'cors'

const app = express()

// middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("<h1>Medi Store server...</h1>")
})

export default app