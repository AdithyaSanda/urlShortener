import express from "express"
import { connectDB } from "./config/db.js"
import shortenUrlRoute from "./routes/shortenUrlRoute.js"
import getOriginalUrlRoute from "./routes/getOriginalUrlRoute.js"

const app = express()
app.use(express.json())

connectDB()

app.use("/api/shorten", shortenUrlRoute)
app.use("/", getOriginalUrlRoute)

app.listen(5000, () => {
    console.log("server running on port 5000")
})