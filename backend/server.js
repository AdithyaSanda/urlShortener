import express from "express"
import { connectDB } from "./config/db.js"
import shortenUrlRoute from "./routes/shortenUrlRoute.js"
import getOriginalUrlRoute from "./routes/getOriginalUrlRoute.js"
import authRoute from "./routes/authRoutes.js"
import refreshRoute from "./routes/refreshRoute.js"
import logoutRoute from "./routes/logoutRoute.js"
import verifyJWT from "./middleware/verifyJWT.js"
import getUrlsRoute from "./routes/getUrlRoute.js"
import deleteUrlRoute from "./routes/deleteUrlRoute.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())

connectDB()

app.use("/user", authRoute)
app.use('/logout', logoutRoute)
app.use('/refresh', refreshRoute)



app.use("/api/shorten", verifyJWT, shortenUrlRoute)
app.use("/geturls", verifyJWT, getUrlsRoute)
app.use("/deleteUrl/:id", verifyJWT, deleteUrlRoute)


app.use("/", getOriginalUrlRoute)




app.listen(5000, () => {
    console.log("server running on port 5000")
})