import express from "express"
import { connectDB } from "./config/db.js"
import shortenUrlRoute from "./routes/shortenUrlRoute.js"

const app = express()
app.use(express.json())

connectDB()

app.use("/api/shorten", shortenUrlRoute)

app.listen(5000, () => {
    console.log("server running on port 5000")
})