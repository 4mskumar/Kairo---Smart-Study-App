import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { router } from './routes/user.route.js'
import { connectDb } from './lib/db.js'

const PORT = process.env.PORT || 4000
const app = express()
config()


// 1️⃣ CORS — MUST be first
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}))

// 3️⃣ Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
  
  

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`);
    connectDb()
})