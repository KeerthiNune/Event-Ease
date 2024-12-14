import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/auth.js"
import departmentRouter from './routes/department.js'
import studentRouter from './routes/student.js'
import connectToDatabase from "./db/db.js"
import requestRouter from "./routes/request.js"
import settingRouter from './routes/setting.js'

dotenv.config()
connectToDatabase();
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/student',studentRouter)
app.use('/api/request',requestRouter)
app.use('/api/setting',settingRouter)



app.listen(process.env.PORT,() =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})